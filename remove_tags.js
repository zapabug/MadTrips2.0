// remove_tags_and_bitcoin_payment.js (ESM version)
import fs from 'fs';

const path = 'public/pacages/madeira_btc_businesses_20250511_172142.json';

// Read the JSON file
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Remove the 'tags' and 'bitcoin_payment' fields from each object
const cleaned = data.map(biz => {
  const { tags, bitcoin_payment, ...rest } = biz;
  return rest;
});

// Write the cleaned data back to the file (or a new file for safety)
fs.writeFileSync(path, JSON.stringify(cleaned, null, 2), 'utf8');

console.log('All \"tags\" and \"bitcoin_payment\" fields removed!');