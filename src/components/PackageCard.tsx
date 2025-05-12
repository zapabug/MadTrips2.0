import React from 'react';

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  featured?: boolean;
}

interface PackageCardProps {
  pkg: Package;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  return (
    <div className="border rounded-lg p-4 shadow-lg bg-white dark:bg-gray-800">
      <img src={pkg.imageUrl} alt={pkg.name} className="w-full h-48 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-semibold text-ocean dark:text-white mb-2">{pkg.name}</h3>
      <p className="text-forest/80 dark:text-gray-300 mb-2 text-sm">{pkg.description}</p>
      <p className="text-lg font-bold text-bitcoin mb-4">{pkg.price.toFixed(4)} BTC</p>
      {/* Add a Link to package details page if needed */}
      {/* <Link to={`/packages/${pkg.id}`} className="text-white bg-bitcoin hover:bg-bitcoin/90 px-4 py-2 rounded">
        View Details
      </Link> */}
    </div>
  );
};

export default PackageCard; 