function useNativeImg(src) {
    return src.endsWith(".svg");
}
/** Native img for SVG; Next/Image for raster photos. */
export function AssetImage({ src, alt, width, height, className = "", fill, }) {
    if (useNativeImg(src)) {
        if (fill) {
            return (
            <img src={src} alt={alt} className={`absolute inset-0 h-full w-full object-cover ${className}`}/>);
        }
        return (
        <img src={src} alt={alt} width={width} height={height} className={className}/>);
    }
    // Fallback: treat unknown paths as native img to avoid optimizer failures
    return (
    <img src={src} alt={alt} width={width} height={height} className={fill
            ? `absolute inset-0 h-full w-full object-cover ${className}`
            : className}/>);
}
