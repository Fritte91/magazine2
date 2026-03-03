/**
 * Skeleton loader for article cards
 * Provides better perceived performance during loading
 */
export default function ArticleSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-charcoal/10">
        {/* Image skeleton */}
        <div className="h-48 md:h-64 bg-gray-200"></div>
        
        {/* Content skeleton */}
        <div className="p-4 md:p-6 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  )
}
