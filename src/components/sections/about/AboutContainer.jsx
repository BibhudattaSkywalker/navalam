/** Figma frame uses x=69 as the primary content inset on 1728px artboard. */
export function AboutContainer({ children, className = "" }) {
    return (<div className={`relative mx-auto w-full max-w-[1400px] px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-14 ${className}`}>
      {children}
    </div>);
}
