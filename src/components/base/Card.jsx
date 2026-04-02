// Base Card component

export default function Card({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

export function CardContent({ children, ...props }) {
  return (
    <div className="p-4" {...props}>
      {children}
    </div>
  );
}
