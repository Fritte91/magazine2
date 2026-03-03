/**
 * Skeleton loader for product cards
 */
export default function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-white rounded-xl p-6 md:p-8 border-2 border-charcoal/10">
        <div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>
        <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-6"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  )
}
