const fs = require('fs');
const path = require('path');

// Define paths relative to the script location
const baseDir = path.join(__dirname, '..'); // Project root
const mdPath = path.join(baseDir, 'public/packages/madbiz.md');
const jsonPath = path.join(baseDir, 'public/packages/madeira_btc_businesses_20250511_172142.json');

console.log(`Reading Markdown from: ${mdPath}`);
console.log(`Reading/Writing JSON to: ${jsonPath}`);

try {
    // Read files
    if (!fs.existsSync(mdPath)) throw new Error(`Markdown file not found: ${mdPath}`);
    if (!fs.existsSync(jsonPath)) throw new Error(`JSON file not found: ${jsonPath}`);

    const mdContent = fs.readFileSync(mdPath, 'utf8');
    const jsonContent = fs.readFileSync(jsonPath, 'utf8');
    let jsonData = JSON.parse(jsonContent);

    // 1. Find the "Pending Updates & Additions" section
    // Regex looks for the specific header and captures everything until the next H3 (###) or end of file.
    const updatesSectionRegex = /### 📝 Pending Updates & Additions([\s\S]*?)(?=###|$)/;
    const sectionMatch = mdContent.match(updatesSectionRegex);

    if (!sectionMatch || !sectionMatch[1]) {
        console.log("No 'Pending Updates & Additions' section found or it's empty. No updates processed.");
        process.exit(0); // Exit gracefully
    }
    const updatesContent = sectionMatch[1];

    // 2. Parse entries within the section
    // Regex looks for **Name** followed by lines starting with * **, capturing key/value pairs until ---
    const entryRegex = /\*\*(.*?)\*\*\s*\n([\s\S]*?)(?=---|$)/g; // Simplified lookahead, stop only at entry separator --- or end of section
    let entryMatch;
    const newEntries = [];
    let processedEntriesCount = 0;

    // Isolate the content containing the actual entries (after "Pending Entries:")
    const pendingEntriesHeader = "**Pending Entries:**";
    const headerIndex = updatesContent.indexOf(pendingEntriesHeader);
    const entriesContent = headerIndex !== -1 
        ? updatesContent.substring(headerIndex + pendingEntriesHeader.length).trim() 
        : ""; // Only parse content after the header
    
    if (!entriesContent) {
        console.log("Could not find '**Pending Entries:**' header or no entries listed below it.");
        process.exit(0);
    }

    while ((entryMatch = entryRegex.exec(entriesContent)) !== null) {
        processedEntriesCount++;
        const businessName = entryMatch[1].trim();
        const detailsBlock = entryMatch[2];

        // Skip empty blocks
        if (!detailsBlock.trim()) continue;

        const businessData = { name: businessName };
        const detailLines = detailsBlock.split('\n').map(l => l.trim()).filter(l => l.startsWith('*'));

        detailLines.forEach(line => {
            // Match "*   **Key:** Value"
            const detailMatch = line.match(/^\*\s+\*\*(.*?):\*\*\s*(.*)/);
            if (detailMatch) {
                const key = detailMatch[1].trim();
                const value = detailMatch[2].trim();

                 // Skip empty values unless it's an intentional field like Notes
                 if (!value && key !== 'Notes') return;

                switch (key) {
                    case 'Status':
                        // Store status directly as specified in the markdown
                        businessData.status = value; // e.g., "Accepts Bitcoin", "Does NOT Accept Bitcoin", "Unknown"
                        break;
                    case 'Category':
                        businessData.category = value; // Store category to know where to put it
                        break;
                    case 'City':
                        businessData.city = value;
                        break;
                    case 'Coordinates':
                         if (value && value !== 'Optional') {
                             const coords = value.split(',').map(c => parseFloat(c.trim()));
                             if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
                                 businessData.coordinates = [coords[0], coords[1]]; // Leaflet uses [lat, lng]
                             } else {
                                 console.warn(`[WARN] Could not parse coordinates for "${businessName}": ${value}`);
                             }
                         }
                        break;
                    case 'Address':
                         if (value && value !== 'Optional') businessData.address = value;
                        break;
                    case 'Phone':
                         if (value && value !== 'Optional') businessData.phone = value;
                        break;
                    case 'Website':
                         if (value && value !== 'Optional') businessData.website = value;
                        break;
                    case 'Notes':
                        // Map Notes to description, handle optional/empty
                        businessData.description = (value && value !== 'Optional') ? value : '';
                        break;
                    default:
                         console.warn(`[WARN] Unknown key "${key}" found for business "${businessName}".`);
                }
            }
        });

        // Only add if essential info (name and category) is present
        if (businessData.name && businessData.category) {
            newEntries.push(businessData);
        } else if (businessName) { // Only warn if a name was found but category was missing
            console.warn(`[WARN] Skipping entry for "${businessName}" due to missing Category.`);
        }
         // If businessName was empty, it's likely noise in the markdown, ignore silently.
    }
     console.log(`Found ${processedEntriesCount} potential entries in Markdown, processed ${newEntries.length} valid entries.`);

    // 3. Update JSON data
    let updated = false;
    let addedCount = 0;
    let updatedCount = 0; // Add counter for updates
    let skippedCount = 0;

    newEntries.forEach(entry => {
        const { category, ...businessJson } = entry; // Separate category from the rest of the data

        // Ensure category exists in JSON data
        if (!jsonData[category]) {
            jsonData[category] = [];
            console.log(`[INFO] Created new category in JSON: "${category}"`);
        }

        // Find existing entry index
        const existingIndex = jsonData[category].findIndex(b => 
            b.name === businessJson.name && b.city === businessJson.city
        );

        if (existingIndex !== -1) {
            // --- UPDATE Existing Entry --- 
            // Merge new data into the existing entry
            Object.assign(jsonData[category][existingIndex], businessJson);
            console.log(`[UPDATED] '${businessJson.name}' in category '${category}'.`);
            updatedCount++;
            updated = true;
        } else {
            // --- ADD New Entry --- 
            // Add as a new entry if it doesn't exist
            jsonData[category].push(businessJson);
            console.log(`[ADDED] '${businessJson.name}' to category '${category}'.`);
            addedCount++;
            updated = true;
            // Note: The original script had a duplicate check here which is now implicitly 
            // handled by the findIndex check above. We don't need a separate skip logic 
            // unless we want to skip based on other criteria in the future.
        }
    });

    // 4. Write updated JSON back to file
    if (updated) {
        fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), 'utf8'); // Pretty print JSON
        console.log(`\n✅ Successfully updated ${path.basename(jsonPath)}: ${addedCount} added, ${updatedCount} updated.`); // Updated log message

        // IMPORTANT: Inform the user they should manually clear or manage the processed entries in madbiz.md
        console.log("\n👉 Action Required: Please review the 'Pending Updates & Additions' section in madbiz.md.");
        console.log("   Consider removing or marking processed entries to avoid duplicates on the next run.");

    } else {
        console.log("\nℹ️ No new entries were added to the JSON file.");
    }

} catch (error) {
    console.error("\n❌ Error running update script:", error);
    process.exit(1); // Exit with error code
} 