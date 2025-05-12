import { useRef, useEffect, useState } from 'react'
import { FEATURED_BUSINESSES } from '../../data/packages'

export function FunchalMap() {
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

  return (
    <>
      <div className="w-full h-[400px] sm:h-[550px] lg:h-[700px] relative p-3 rounded-lg overflow-hidden">
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
      {/* Featured Business Section */}
      {FEATURED_BUSINESSES.length > 0 && (
        <div className="mt-6 flex justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 flex items-center max-w-xl w-full">
            {FEATURED_BUSINESSES[0].image && (
              <img
                src={FEATURED_BUSINESSES[0].image}
                alt={FEATURED_BUSINESSES[0].name}
                className="w-24 h-24 object-cover rounded-lg mr-4"
              />
            )}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{FEATURED_BUSINESSES[0].name}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">{FEATURED_BUSINESSES[0].description}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{FEATURED_BUSINESSES[0].city}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 