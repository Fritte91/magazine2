export default function StatisticsSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container-padding max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 md:p-12 lg:p-16 hover:shadow-lg transition-shadow duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Stat 1 */}
            <div className="text-center">
              <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-green-primary mb-2 md:mb-4 leading-none">
                420
              </div>
              <p className="text-sm md:text-base text-charcoal font-sans uppercase tracking-wider font-medium">
                LIMITED COPIES
              </p>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-green-primary mb-2 md:mb-4 leading-none">
                12
              </div>
              <p className="text-sm md:text-base text-charcoal font-sans uppercase tracking-wider font-medium">
                FEATURED ARTISTS
              </p>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-green-primary mb-2 md:mb-4 leading-none">
                24
              </div>
              <p className="text-sm md:text-base text-charcoal font-sans uppercase tracking-wider font-medium">
                UNIQUE STORIES
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

