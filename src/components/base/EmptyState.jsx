// Base EmptyState component
export default function EmptyState({ children, ...props }) {
  return <div {...props}>{children}</div>;
}
