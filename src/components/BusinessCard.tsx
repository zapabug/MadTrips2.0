import React from 'react';

interface BusinessCardProps {
  name: string;
  type?: string; // Type is optional as some businesses might not have one listed
  city: string;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ name, type, city }) => {
  // Styling constants based on the warm theme for cards
  const cardBg = "bg-warm-sand"; 
  const primaryText = "text-deep-amber"; 
  const secondaryText = "text-amber-700"; // Using Tailwind's default amber
  const titleText = "text-bitcoin"; 

  return (
    <div className={`${cardBg} bg-opacity-95 p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 sm:space-x-4`}>
      <div className="flex-grow">
        <h4 className={`font-semibold ${titleText}`}>{name}</h4>
        {type && (
          <p className={`text-sm ${primaryText}`}>{type}</p>
        )}
      </div>
      <div className="flex-shrink-0">
        <p className={`text-sm ${secondaryText}`}>{city}</p>
      </div>
    </div>
  );
};

export default BusinessCard; 