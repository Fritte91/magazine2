interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
  useCloudflare?: boolean // Enable Cloudflare image optimization
}

/**
 * OptimizedImage component with better performance
 * - Prevents layout shift with width/height attributes
 * - Lazy loading for below-fold images
 * - Async decoding for better performance
 * - Aspect ratio preservation
 * - Optional Cloudflare image optimization support (free plan compatible)
 */
export default function OptimizedImage({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  useCloudflare = false,
}: OptimizedImageProps) {
  // Calculate aspect ratio if width and height are provided
  const aspectRatio = width && height ? width / height : undefined

  // Generate Cloudflare-optimized srcset if enabled
  const generateCloudflareSrcSet = (): string | undefined => {
    if (!useCloudflare || !width) return undefined

    const widths = [400, 800, 1200, 1600]
    return widths
      .filter(w => w <= width * 2) // Don't upscale beyond 2x
      .map(w => `${src}?width=${w}&quality=85&format=auto ${w}w`)
      .join(', ')
  }

  // Generate Cloudflare-optimized src if enabled
  const optimizedSrc = useCloudflare && width
    ? `${src}?width=${width}&quality=85&format=auto`
    : src

  const srcSet = generateCloudflareSrcSet()

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      sizes={sizes}
      srcSet={srcSet}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      style={{
        aspectRatio: aspectRatio ? `${width} / ${height}` : undefined,
        // Prevent layout shift
        objectFit: "cover",
      }}
      // Add fetchpriority for critical images (lowercase for React compatibility)
      fetchpriority={priority ? "high" : "auto"}
    />
  )
}
