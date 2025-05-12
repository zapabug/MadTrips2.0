import React from 'react';

interface KidFriendlyCardProps {
  name: string;
  type?: string; // Details or type of place
}

const KidFriendlyCard: React.FC<KidFriendlyCardProps> = ({ name, type }) => {
  // Styling constants - can be adjusted as needed
  const cardBg = "bg-warm-sand"; 
  const primaryText = "text-deep-amber"; 
  const titleText = "text-bitcoin";

  return (
    <div className={`${cardBg} bg-opacity-90 p-4 rounded-lg shadow hover:shadow-md transition-shadow h-full flex flex-col`}>
      <h5 className={`text-lg font-semibold ${titleText} mb-1`}>{name}</h5>
      {type && (
        <p className={`text-sm ${primaryText} flex-grow`}>{type}</p>
      )}
    </div>
  );
};

export default KidFriendlyCard; 