import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'; // React Router hooks
// Assuming type and data paths
import type { Package } from '../types/package-types'; 
import { getPackageById, formatSats } from '../data/packages';

// Placeholder for now
// import { useCartStore } from '../store/cartStore'; 
// import CheckoutAuthWrapper from '../components/checkout/CheckoutAuthWrapper';

export function PackageDetailPage() {
  const { id: packageId } = useParams<{ id: string }>(); // Get packageId from URL
  const navigate = useNavigate();

  const [packageItem, setPackageItem] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined); // Keep for later

  // Placeholder for cart logic
  // const { addItem, items } = useCartStore(); 
  // const isInCart = items.some(item => item.packageId === packageId);
  const isInCart = false; // Stub

  useEffect(() => {
    setLoading(true);
    if (!packageId) {
      setError('Invalid package ID');
      setLoading(false);
      return;
    }
    const foundPackage = getPackageById(packageId);
    if (foundPackage) {
      setPackageItem(foundPackage);
      setError(null);
    } else {
      setError('Package not found');
      setPackageItem(null); // Ensure packageItem is null if not found
    }
    setLoading(false);
  }, [packageId]);

  // const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Keep for later
  //   const date = new Date(e.target.value);
  //   setSelectedDate(date);
  // };

  const handleAddToCart = () => { // Stubbed
    if (!packageItem) return;
    // addItem(packageItem, selectedDate);
    alert(`Package "${packageItem.title}" added to cart (stubbed)!`);
    // navigate('/checkout'); // Navigate to checkout (for later)
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-10rem)]"> {/* Ensure it takes height */}
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F7931A]" />
      </div>
    );
  }

  if (error || !packageItem) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg text-center">
          <h2 className="text-xl font-bold text-red-800 dark:text-red-200">Error</h2>
          <p className="text-red-700 dark:text-red-300">{error || 'Failed to load package'}</p>
          <Link to="/packages" className="mt-4 inline-block text-blue-500 hover:underline">
            Browse all packages
          </Link>
        </div>
      </div>
    );
  }

  // For now, we'll return the JSX directly without CheckoutAuthWrapper
  return (
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Link to="/packages" className="text-bitcoin hover:underline"> {/* Use 'to' and style */}
              ← Back to packages
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-80 md:h-[400px] overflow-hidden rounded-lg shadow-lg bg-gray-700"> {/* Added bg for placeholder */}
              <img
                src={packageItem.image || '/assets/placeholder.jpg'}
                alt={packageItem.title}
                className="absolute inset-0 w-full h-full object-cover"
                // width={600} // Not needed for Tailwind object-cover
                // height={400}
              />
            </div>
            
            <div className="text-white"> {/* Adjusted text colors for gradient */}
              <h1 className="text-3xl font-bold mb-3">{packageItem.title}</h1>
              
              <div className="mb-6">
                <p className="text-lg mb-4 text-gray-300">{packageItem.description}</p>
                
                <div className="flex items-center text-lg font-bold mb-2">
                  <span className="mr-2 text-gray-200">Price:</span>
                  <span className="text-[#F7931A]">{formatSats(packageItem.price)}</span> {/* formatSats already returns string with 'sats' */}
                </div>
                
                <div className="flex items-center mb-4 text-gray-200">
                  <span className="mr-2">Duration:</span>
                  <span>{packageItem.duration}</span>
                </div>
                
                <div className="mb-4 text-gray-200">
                  <h3 className="font-bold mb-2">What&apos;s included:</h3>
                  <ul className="list-disc pl-5 text-gray-300">
                    {packageItem.includes.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="bg-white/10 dark:bg-gray-800/50 rounded-lg shadow p-4 backdrop-blur-sm"> {/* Frosted glass effect */}
                <h2 className="text-xl font-bold mb-4 text-white">Book Now</h2>
                
                <div className="mb-4">
                  <label className="block text-gray-300 dark:text-gray-300 mb-2">
                    Select Date:
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    // className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 text-gray-800" // Make input text visible
                    className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white placeholder-gray-400 focus:ring-bitcoin focus:border-bitcoin"

                    // onChange={handleDateChange} // For later
                  />
                </div>
                
                {isInCart ? (
                  <div className="mb-4">
                    <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-3 rounded mb-4">
                      This package is already in your cart.
                    </div>
                    <Link 
                      to="/checkout" // Use 'to'
                      className="block w-full py-3 px-4 bg-[#F7931A] hover:bg-[#E87F17] text-white rounded-lg font-medium text-center"
                    >
                      Go to Checkout
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-3 px-4 bg-[#F7931A] hover:bg-[#E87F17] text-white rounded-lg font-medium"
                  >
                    Add to Cart (Stubbed)
                  </button>
                )}
                
                {/* Placeholder for Authentication notice - assuming false for now */}
                {false && ( 
                  <p className="mt-3 text-sm text-gray-400 dark:text-gray-400 text-center">
                    You&apos;ll be asked to authenticate with Nostr when making a payment
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
  );
} 