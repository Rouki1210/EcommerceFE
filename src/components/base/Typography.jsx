// Base Typography component
export default function Typography({ children, ...props }) {
  return <span {...props}>{children}</span>;
}
