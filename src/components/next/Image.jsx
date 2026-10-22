export default function Image({
  src,
  alt = "",
  width,
  height,
  className = "",
  fill = false,
  priority = false,
  sizes,
  ...rest
}) {
  const fillClass = fill ? "absolute inset-0 h-full w-full" : "";

  return (
    <img
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={`${fillClass} ${className}`.trim()}
      sizes={sizes}
      fetchPriority={priority ? "high" : undefined}
      {...rest}
    />
  );
}
