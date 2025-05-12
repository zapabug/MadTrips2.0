import React from 'react';
import { useResponsiveNumItems } from '../hooks/useResponsiveNumItems';
import PackageCard from '../components/PackageCard';
import type { Package as PackageType } from '../components/PackageCard';

// --- Mock Data (Replace with your actual data fetching) ---
const allPackagesData: PackageType[] = [
  { id: '1', name: 'Culinary Adventure', description: 'Taste the best of local cuisine.', price: 0.005, imageUrl: '/placeholder-image.jpg', featured: true },
  { id: '2', name: 'Mountain Trek', description: 'Explore scenic mountain trails.', price: 0.003, imageUrl: '/placeholder-image.jpg', featured: true },
  { id: '3', name: 'Beach Getaway', description: 'Relax on pristine beaches.', price: 0.007, imageUrl: '/placeholder-image.jpg', featured: true },
  { id: '4', name: 'Historical Tour', description: 'Discover the rich history of the area.', price: 0.002, imageUrl: '/placeholder-image.jpg', featured: true },
  { id: '5', name: 'Luxury Spa Retreat', description: 'Indulge in ultimate relaxation.', price: 0.01, imageUrl: '/placeholder-image.jpg', featured: false },
];
// --- End Mock Data ---

const HomePage: React.FC = () => {
  const numFeaturedToShow = useResponsiveNumItems(1, 2, 3); // Show 1 on mobile, 2 on tablet, 3 on desktop

  const featuredPackages = allPackagesData
    .filter(pkg => pkg.featured)
    .slice(0, numFeaturedToShow);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-ocean dark:text-white my-6 text-center">Featured Packages</h1>
      {featuredPackages.length > 0 ? (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
          {featuredPackages.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      ) : (
        <p className="text-center text-forest/70 dark:text-gray-400">No featured packages available at the moment.</p>
      )}
      {/* You can add other sections of your homepage here */}
    </div>
  );
};

export default HomePage; 