import "./basePage.css";

/**
 * BasePage Component
 * Provides consistent layout structure for all page components
 * @param {Object} props
 * @param {ReactNode} props.children - Page content
 * @param {Object} props.banner - Optional banner configuration
 * @param {string} props.banner.title - Banner title
 * @param {string} props.banner.subtitle - Banner subtitle
 * @param {string} props.banner.category - Optional category label
 * @param {ReactNode} props.header - Optional header content
 * @param {boolean} props.noBanner - Skip banner rendering
 */
export default function BasePage({
  children,
  banner,
  header,
  noBanner = false,
}) {
  return (
    <div className="page-container">
      {!noBanner && banner && (
        <div className="page-banner">
          <div className="banner-content">
            {banner.category && (
              <p className="text-xs tracking-widest uppercase text-[#c8a96e] mb-3 fade-in">
                {banner.category}
              </p>
            )}
            {banner.title && (
              <h1 className="heading text-5xl text-white mb-3 fade-in">
                {banner.title}
              </h1>
            )}
            {banner.subtitle && (
              <p
                className="text-[#bbb] text-sm max-w-md fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                {banner.subtitle}
              </p>
            )}
            {/* Decorative circles */}
            <div className="decorative-circle absolute -right-16 -top-16 w-64 h-64" />
            <div className="decorative-circle absolute -right-8 -bottom-20 w-48 h-48" />
          </div>
        </div>
      )}

      {header && (
        <div className="page-section border-b border-[#ece7e0]">{header}</div>
      )}

      {children}
    </div>
  );
}
