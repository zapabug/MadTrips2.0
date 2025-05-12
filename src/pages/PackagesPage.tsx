import React from 'react';
import PackageCard from '../components/PackageCard';
import type { Package as PackageType } from '../components/PackageCard';
// import BusinessCard from '../components/BusinessCard'; // No longer directly used on this page
import KidFriendlyCard from '../components/KidFriendlyCard';

// --- Mock Data (Reuse or fetch your actual data) ---
const allPackagesData: PackageType[] = [
  { id: '1', name: 'Culinary Adventure', description: 'Taste the best of local cuisine.', price: 0.005, imageUrl: '/placeholder-image.jpg', featured: true },
  { id: '2', name: 'Mountain Trek', description: 'Explore scenic mountain trails.', price: 0.003, imageUrl: '/placeholder-image.jpg', featured: true },
  { id: '3', name: 'Beach Getaway', description: 'Relax on pristine beaches.', price: 0.007, imageUrl: '/placeholder-image.jpg', featured: true },
  { id: '4', name: 'Historical Tour', description: 'Discover the rich history of the area.', price: 0.002, imageUrl: '/placeholder-image.jpg', featured: true },
  { id: '5', name: 'Luxury Spa Retreat', description: 'Indulge in ultimate relaxation.', price: 0.01, imageUrl: '/placeholder-image.jpg', featured: false }, // Not featured
  { id: '6', name: 'Wine Tasting Experience', description: 'Sample local wines.', price: 0.004, imageUrl: '/placeholder-image.jpg', featured: true }, // Featured
];

// --- Extracted Business Data ---
const bitcoinEssentialsAndFamilyFun = [
  { name: 'Café Fortaleza', type: 'Café – epic views, kids outdoor playground' },
  { name: 'Tiny Tribo', type: 'Child Amusement Center' },
  { name: 'Deliciosamente Mimi', type: 'Babysitting – highly recommended' },
  { name: 'Mais Clinic', type: 'Medical Clinic, Bitcoin ATM on location' },
  { name: 'COIN4CASH', type: 'P2P Service' },
];

// This constant is no longer used as its data was merged above
// const bitcoinServices = []; 

// Placeholder for Honorable Mentions
const honorableMentionsData = [];
// --- End Business Data ---

const PackagesPage: React.FC = () => {
  const featuredPackages = allPackagesData.filter(pkg => pkg.featured);

  const mainPageTitleStyle = "text-4xl font-bold text-bitcoin dark:text-bitcoin mb-10 text-center";
  const sectionTitleStyle = "text-2xl font-bold text-bitcoin dark:text-bitcoin my-8 text-center";

  return (
    <div className="container mx-auto p-4">
      <h1 className={mainPageTitleStyle}>Discover Madeira's Packages & Places</h1>

      <section className="mb-12">
        <h2 className={sectionTitleStyle}>Our Featured Packages</h2>
        {featuredPackages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPackages.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <p className="text-center text-warm-peach dark:text-warm-peach">No featured packages available at the moment.</p>
        )}
      </section>

      {/* Bitcoin Essentials & Family Fun Section - Updated Title and Data */}
      <section className="mb-12 pt-8 border-t border-warm-sand/30 dark:border-gray-700">
        <h2 className={sectionTitleStyle}>Bitcoin Essentials & Family Fun</h2>
        {bitcoinEssentialsAndFamilyFun.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {bitcoinEssentialsAndFamilyFun.map(biz => (
              <KidFriendlyCard key={biz.name} name={biz.name} type={biz.type} />
            ))}
          </div>
        ) : (
          <p className="text-center text-warm-peach dark:text-warm-peach">No specific options listed yet.</p>
        )}
      </section>

      {/* Bitcoin Services Section is now effectively merged above */}
      {/* If you want to keep it separate with BusinessCard, uncomment and adjust data
      <section className="mb-12 pt-8 border-t border-warm-sand/30 dark:border-gray-700">
        <h2 className={sectionTitleStyle}>Bitcoin Services (Original)</h2>
        {bitcoinServices.length > 0 ? (
          <div className="space-y-4">
            {bitcoinServices.map(biz => (
              <BusinessCard key={biz.name} name={biz.name} type={biz.type} city={biz.city} />
            ))}
          </div>
        ) : (
          <p className="text-center text-warm-peach dark:text-warm-peach">No specific Bitcoin services listed yet.</p>
        )}
      </section>
      */}

      {/* Honorable Mentions Section (Updated) */}
      <section className="mb-12 pt-8 border-t border-warm-sand/30 dark:border-gray-700">
        <h2 className={sectionTitleStyle}>Honorable Mentions</h2>
        <h3 className="text-lg font-semibold text-warm-peach dark:text-warm-peach text-center mb-2">
          Always ask: "Can I pay in Bitcoin?"
        </h3>
        <p className="text-center text-warm-sand dark:text-warm-sand mb-6 max-w-2xl mx-auto">
          These are businesses I believe will benefit or have great offers that Bitcoiners will love if they start taking Bitcoin directly.
        </p>
        {honorableMentionsData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {/* Map over honorableMentionsData when data is available, e.g., using KidFriendlyCard or BusinessCard */}
            {/* {honorableMentionsData.map(biz => (
              <KidFriendlyCard key={biz.name} name={biz.name} type={biz.type} />
            ))} */}
          </div>
        ) : (
          <p className="text-center text-warm-peach dark:text-warm-peach">Suggestions coming soon...</p>
        )}
      </section>

    </div>
  );
};

export default PackagesPage; 