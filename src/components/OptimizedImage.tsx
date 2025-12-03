interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: OptimizedImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      style={{
        aspectRatio: width && height ? `${width} / ${height}` : undefined,
      }}
    />
  )
}

