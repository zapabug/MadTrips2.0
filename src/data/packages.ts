import type { Package, Business } from '../types/package-types';

// Shared packages data for use across the application
export const PACKAGES: Package[] = [
  {
    id: '1',
    title: 'Beach Day Experience',
    description: 'Enjoy a day at Madeira\'s most beautiful beaches with transportation included.',
    price: 1, // 1 sat for testing
    duration: '1 Day',
    includes: ['Transportation', 'Lunch', 'Beach Equipment'],
    image: '/assets/packages/beach-day.jpg',
    providerNpub: 'npub1dxd02kcjhgpkyrx60qnkd6j42kmc72u5lum0rp2ud8x5zfhnk4zscjj6hh'
  },
  {
    id: '2',
    title: 'Mountain Explorer',
    description: 'Discover the stunning mountains and levadas of Madeira with expert guides.',
    price: 2, // 2 sats for testing
    duration: '2 Days',
    includes: ['Transportation', 'Accommodation', 'Meals', 'Guided Tours'],
    image: '/assets/packages/mountains.jpg',
    providerNpub: 'npub1dxd02kcjhgpkyrx60qnkd6j42kmc72u5lum0rp2ud8x5zfhnk4zscjj6hh'
  },
  {
    id: '3',
    title: 'Bitcoin Conference Package',
    description: 'All-inclusive package for the annual Bitcoin Madeira Conference.',
    price: 3, // 3 sats for testing
    duration: '3 Days',
    includes: ['Conference Entry', 'Accommodation', 'Meals', 'Networking Events'],
    image: '/assets/packages/conference.jpg',
    providerNpub: 'npub1dxd02kcjhgpkyrx60qnkd6j42kmc72u5lum0rp2ud8x5zfhnk4zscjj6hh'
  },
  {
    id: '4',
    title: 'Porto Santo Getaway',
    description: 'Experience the golden beaches of Porto Santo island with this all-inclusive package.',
    price: 4, // 4 sats for testing
    duration: '3 Days',
    includes: ['Ferry Transportation', 'Beach Hotel', 'Meals', 'Island Tour'],
    image: '/assets/packages/porto-santo.jpg',
    providerNpub: 'npub1dxd02kcjhgpkyrx60qnkd6j42kmc72u5lum0rp2ud8x5zfhnk4zscjj6hh'
  },
  {
    id: '5',
    title: 'Madeira Food Tour',
    description: 'Taste the unique flavors of Madeira with this guided food tour around the island.',
    price: 5, // 5 sats for testing
    duration: '1 Day',
    includes: ['Multiple Food Tastings', 'Wine Tasting', 'Expert Guide', 'Transportation'],
    image: '/assets/packages/food-tour.jpg',
    providerNpub: 'npub1dxd02kcjhgpkyrx60qnkd6j42kmc72u5lum0rp2ud8x5zfhnk4zscjj6hh'
  },
  {
    id: '6',
    title: 'Hiking Adventure',
    description: 'Explore Madeira\'s most breathtaking trails with experienced local guides.',
    price: 6, // 6 sats for testing
    duration: '2 Days',
    includes: ['Trail Access', 'Safety Equipment', 'Meals', 'Transportation'],
    image: '/assets/packages/hiking.jpg',
    providerNpub: 'npub1dxd02kcjhgpkyrx60qnkd6j42kmc72u5lum0rp2ud8x5zfhnk4zscjj6hh'
  }
];

// Helper function to format satoshi amount to BTC
export const formatSats = (sats: number, includeRaw = false) => {
  // For testing with small amounts, display in sats rather than BTC
  return includeRaw 
    ? `${sats} sats` 
    : `${sats} sats`;
};

// Featured packages - just first 4 packages
export const FEATURED_PACKAGES = PACKAGES.slice(0, 3);

// Get package by ID
export const getPackageById = (id: string): Package | undefined => {
  return PACKAGES.find(pkg => pkg.id === id);
};

// Featured businesses for display under the map
export const FEATURED_BUSINESSES: Business[] = [
  {
    id: 'cafe-fortaleza',
    name: 'Café Fortaleza',
    description: 'Café – epic views, kids outdoor playground',
    city: 'Funchal',
    type: 'Café',
    image: '/assets/businesses/placeholder.png', // Placeholder image
    npub: '' // Placeholder npub
  },
  {
    id: 'mais-clinic',
    name: 'Mais Clinic',
    description: 'Medical Clinic – Bitcoin ATM on location',
    city: 'Funchal',
    type: 'Clinic',
    image: '/assets/businesses/placeholder.png', // Placeholder image
    npub: '' // Placeholder npub
  },
  {
    id: 'viola-restaurant',
    name: 'Viola Restaurant',
    description: 'The Bitcoin Steakhouse – must-visit',
    city: 'Estreito de Câmara de Lobos',
    type: 'Restaurant',
    image: '/assets/businesses/placeholder.png', // Placeholder image
    npub: '' // Placeholder npub
  },
  {
    id: 'kampo-julio-pereira',
    name: 'Kampo by Chef Júlio Pereira',
    description: 'Michelin-level – creative meat dishes by Júlio Pereira',
    city: 'Funchal',
    type: 'Restaurant',
    image: '/assets/businesses/placeholder.png', // Placeholder image
    npub: '' // Placeholder npub
  },
  {
    id: 'akua-julio-pereira',
    name: 'Akua by Chef Júlio Pereira',
    description: 'Seafood-focused fine dining by Júlio Pereira',
    city: 'Funchal',
    type: 'Restaurant',
    image: '/assets/businesses/placeholder.png', // Placeholder image
    npub: '' // Placeholder npub
  },
  {
    id: 'design-centre-nini',
    name: 'Design Centre Nini Andrade Silva',
    description: 'Bar Restaurant – epic location with panoramic views',
    city: 'Funchal',
    type: 'Bar Restaurant',
    image: '/assets/businesses/placeholder.png', // Placeholder image
    npub: '' // Placeholder npub
  },
  {
    id: 'barreirinha-bar-cafe',
    name: 'Barreirinha Bar Café',
    description: 'Bar & Coffee – ocean views, must visit',
    city: 'Funchal',
    type: 'Bar & Coffee',
    image: '/assets/businesses/placeholder.png', // Placeholder image
    npub: '' // Placeholder npub
  },
  {
    id: 'queijaria-avo',
    name: 'Queijaria da Avó',
    description: 'Azorean Cheese Shop',
    city: 'Funchal',
    type: 'Shop',
    image: '/assets/businesses/placeholder.png', // Placeholder image
    npub: '' // Placeholder npub
  },
  {
    id: 'deliciosamente-mimi',
    name: 'Deliciosamente Mimi',
    description: 'Babysitting – highly recommended',
    city: 'Funchal',
    type: 'Service',
    image: '/assets/businesses/placeholder.png', // Placeholder image
    npub: '' // Placeholder npub
  },
  {
    id: 'coolzoone-madeira',
    name: 'Coolzoone Madeira',
    description: 'Health & Wellness',
    city: 'Funchal',
    type: 'Wellness',
    image: '/assets/businesses/placeholder.png', // Placeholder image
    npub: '' // Placeholder npub
  }
  // Note: Yuki by Chef Júlio Pereira was missing from the Featured list in madbiz.md
]; 