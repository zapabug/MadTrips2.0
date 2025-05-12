import { Link } from 'react-router-dom';
// Assuming we'll create this placeholder or port the actual component later
import { CustomPackageBuilder } from '../components/packages/CustomPackageBuilder'; 

export function CustomPackagePage() {
  return (
    // Removed id="packages" as it might conflict if used elsewhere for scrolling.
    // The main container background is handled by App.tsx
    <div className="py-12 sm:py-16 lg:py-20"> 
      <div className="container mx-auto px-4"> {/* Using container for consistent padding */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"> {/* Adjusted text color for gradient */}
            Build Your Custom Package
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-300 dark:text-gray-400"> {/* Adjusted text color */}
            Combine your favorite activities to create your perfect Bitcoin-friendly Madeira experience
          </p>
        </div>

        <CustomPackageBuilder />

        <div className="mt-16 text-center">
           {/* Adjusted text color */}
          <p className="text-gray-300 dark:text-gray-400 mb-4">Prefer a pre-designed experience?</p>
          <Link 
            to="/packages" // Use 'to' prop
            className="inline-block rounded-md bg-ocean dark:bg-ocean/80 px-5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-ocean/90 transition-colors"
          >
            Browse Our Featured Packages
          </Link>
        </div>
      </div>
    </div>
  );
} 