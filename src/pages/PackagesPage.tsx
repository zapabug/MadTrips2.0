import React from 'react';
import PackageCard from '../components/PackageCard';
import type { Package as PackageType } from '../components/PackageCard';
import CustomPackageBuilder from '../components/CustomPackageBuilder';

// --- Mock Data (Reuse or fetch your actual data) ---
const allPackagesData: PackageType[] = [
  { id: '1', name: 'Culinary Adventure', description: 'Taste the best of local cuisine.', price: 0.005, imageUrl: '/placeholder-image.jpg', featured: true },
  { id: '2', name: 'Mountain Trek', description: 'Explore scenic mountain trails.', price: 0.003, imageUrl: '/placeholder-image.jpg', featured: true },
  { id: '3', name: 'Beach Getaway', description: 'Relax on pristine beaches.', price: 0.007, imageUrl: '/placeholder-image.jpg', featured: true },
  { id: '4', name: 'Historical Tour', description: 'Discover the rich history of the area.', price: 0.002, imageUrl: '/placeholder-image.jpg', featured: true },
  { id: '5', name: 'Luxury Spa Retreat', description: 'Indulge in ultimate relaxation.', price: 0.01, imageUrl: '/placeholder-image.jpg', featured: false }, // Not featured
  { id: '6', name: 'Wine Tasting Experience', description: 'Sample local wines.', price: 0.004, imageUrl: '/placeholder-image.jpg', featured: true }, // Featured
];
// --- End Mock Data ---

const PackagesPage: React.FC = () => {
  const featuredPackages = allPackagesData.filter(pkg => pkg.featured);

  return (
    <div className="container mx-auto p-4">
      {/* Section for Featured Packages */}
      <section className="mb-12">
        <h1 className="text-3xl font-bold text-ocean dark:text-white my-6 text-center">Our Packages</h1>
        {featuredPackages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPackages.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <p className="text-center text-forest/70 dark:text-gray-400">No featured packages available at the moment.</p>
        )}
      </section>

      {/* Section for Custom Package Builder */}
      <section className="my-12 pt-8 border-t border-sand/30 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-ocean dark:text-white mb-8 text-center">Build Your Own Dream Package</h2>
        <CustomPackageBuilder />
      </section>
    </div>
  );
};

export default PackagesPage; 