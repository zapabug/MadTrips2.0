import { Link } from 'react-router-dom';
// Assuming we'll create this placeholder or port the actual component later
import { CustomPackageBuilder } from '../components/packages/CustomPackageBuilder'; 

export function CustomPackagePage() {
  return (
    // Removed id="packages" as it might conflict if used elsewhere for scrolling.
    // The main container background is handled by App.tsx
    <div className="py-12 sm:py-16 lg:py-20"> 
      <div className="container mx-auto px-4"> {/* Using container for consistent padding */}
        <div className="mb-12 text-left"> 
          <h1 className="text-3xl font-bold tracking-tight text-bitcoin sm:text-4xl mb-4">
            Craft Your Ideal Madeira Getaway
          </h1>
          <p className="mt-2 text-lg leading-7 text-warm-sand dark:text-warm-sand">
            Welcome to the custom package builder! Here, you can select your preferred trip duration, 
            accommodation style, and the activities you'd love to experience in Madeira. 
            Simply make your choices below, and we'll provide an estimated price for your selections.
          </p>
          <p className="mt-3 text-md leading-6 text-warm-peach dark:text-warm-peach">
            This tool helps gather your preferences. Once submitted, our team will personally review your choices, 
            consider all logistical details (like travel times and activity coordination), and provide you 
            with a finalized plan and quote. 
          </p>
        </div>

        <CustomPackageBuilder />

        <div className="mt-16 text-center">
          <p className="text-warm-sand dark:text-warm-sand mb-4">Prefer a pre-designed experience?</p>
          <Link 
            to="/packages"
            className="inline-block rounded-md bg-bitcoin px-5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-bitcoin/90 transition-colors"
          >
            Browse Our Featured Packages
          </Link>
        </div>
      </div>
    </div>
  );
} 