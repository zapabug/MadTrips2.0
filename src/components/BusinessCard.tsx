import React, { useState } from 'react';

interface BusinessCardProps {
  name: string;
  type?: string;
  city?: string; // Remains optional, though not displayed currently
  phone?: string;
  website?: string;
  openingHours?: string;
  description?: string; // Keep description if it's used as a fallback for type
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  name,
  type,
  phone,
  website,
  openingHours,
  description,
  // city, // city is still not used for display
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardBg = "bg-warm-sand";
  const primaryText = "text-deep-amber";
  const titleText = "text-bitcoin";
  const detailLabelStyle = "font-semibold text-sm text-amber-700"; // Style for detail labels
  const detailValueStyle = "text-sm text-deep-amber";
  const linkStyle = "text-blue-500 hover:text-blue-700 underline text-sm";

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const displayType = type || description; // Use description as fallback for type

  return (
    <div
      className={`${cardBg} bg-opacity-95 p-4 rounded-lg shadow-md cursor-pointer min-h-[100px] flex flex-col justify-between`} // Added min-height and justify-between
      onClick={handleCardClick}
    >
      {!isFlipped ? (
        // Front of the card
        <div>
          <h4 className={`text-lg font-semibold ${titleText} mb-1`}>{name}</h4>
          {displayType && (
            <p className={`text-sm ${primaryText}`}>{displayType}</p>
          )}
        </div>
      ) : (
        // Back of the card (details)
        <div className="space-y-2">
          <h4 className={`text-md font-semibold ${titleText} mb-2`}>{name}</h4>
          {phone && (
            <div>
              <span className={detailLabelStyle}>Phone: </span>
              <span className={detailValueStyle}>{phone}</span>
            </div>
          )}
          {website && (
            <div>
              <span className={detailLabelStyle}>Website: </span>
              <a href={website.startsWith('http') ? website : `http://${website}`} target="_blank" rel="noopener noreferrer" className={linkStyle} onClick={(e) => e.stopPropagation()}>
                {website}
              </a>
            </div>
          )}
          {openingHours && (
            <div>
              <span className={detailLabelStyle}>Hours: </span>
              <span className={detailValueStyle}>{openingHours}</span>
            </div>
          )}
          {/* Add a small hint to click again to flip back */}
          {!phone && !website && !openingHours && (
            <p className={detailValueStyle}>No additional details available.</p>
          )}
          <p className="text-xs text-gray-500 mt-2 text-center">Click to see less</p>
        </div>
      )}
      {/* Visual cue for flippable card - could be an icon or text hint if desired */}
      <div className="text-xs text-gray-400 mt-auto pt-1 text-right">
        {isFlipped ? 'Less' : 'More...'}
      </div>
    </div>
  );
};

export default BusinessCard; 