import { useRef, useEffect, useState } from 'react'
import { FEATURED_BUSINESSES } from '../../data/packages'

interface FunchalMapProps {
  variant?: 'home' | 'page'
}

export function FunchalMap({ variant = 'page' }: FunchalMapProps) {
  const mapUrl = 'https://btcmap.org/map#10/32.75725/-17.14554'
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false)
    }

    const handleError = () => {
      setIsLoading(false)
      setHasError(true)
    }

    const iframe = iframeRef.current
    if (iframe) {
      iframe.addEventListener('load', handleLoad)
      iframe.addEventListener('error', handleError)
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleLoad)
        iframe.removeEventListener('error', handleError)
      }
    }
  }, [])

  const mapHeightClass = variant === 'home' 
    ? 'h-[350px]' 
    : 'h-[400px] sm:h-[550px] lg:h-[700px]'

  return (
    <>
      <div className={`w-full ${mapHeightClass} relative p-3 rounded-lg overflow-hidden`}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f7931a]"></div>
          </div>
        )}
        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="text-center p-4">
              <p className="text-gray-600 dark:text-gray-400">Unable to load map</p>
              <a 
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f7931a] hover:text-[#f7931a]/80 mt-2 inline-block"
              >
                Open in new tab
              </a>
            </div>
          </div>
        ) : (
          <iframe 
            ref={iframeRef}
            src={mapUrl} 
            width="100%" 
            height="100%" 
            frameBorder="0"
            title="Bitcoin-friendly businesses in Funchal"
            className="w-full h-full"
            loading="lazy"
            allow="geolocation"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        )}
      </div>
      {/* Featured Business Section - Only show if variant is 'page' */}
      {variant === 'page' && FEATURED_BUSINESSES.length > 0 && (
        <div className="mt-8"> 
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Featured Bitcoin Businesses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {FEATURED_BUSINESSES.map((business) => (
              <div key={business.id} className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 flex flex-col items-center text-center max-w-sm w-full">
                {business.image && (
                  <img
                    src={business.image}
                    alt={business.name}
                    className="w-24 h-24 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{business.name}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{business.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{business.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
} 