import { useState, useEffect } from 'react';

/**
 * Custom hook to determine the number of items to display based on screen width.
 * @param mobileCount Number of items for mobile screens.
 * @param tabletCount Number of items for tablet screens.
 * @param desktopCount Number of items for desktop screens.
 * @returns The number of items to display for the current screen size.
 */
export function useResponsiveNumItems(mobileCount: number, tabletCount: number, desktopCount: number): number {
  const [numItems, setNumItems] = useState(desktopCount);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) { // Tailwind's `sm` breakpoint
        setNumItems(mobileCount);
      } else if (window.innerWidth < 1024) { // Tailwind's `lg` breakpoint
        setNumItems(tabletCount);
      } else {
        setNumItems(desktopCount);
      }
    }

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileCount, tabletCount, desktopCount]);

  return numItems;
} 