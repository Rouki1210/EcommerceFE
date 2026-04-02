// Base TypographyBase component
export default function TypographyBase({ children, ...props }) {
  return <span {...props}>{children}</span>;
}
