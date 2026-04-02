// Base Modal component

export default function Modal({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

export function DialogTitle({ children, ...props }) {
  return (
    <div className="px-6 py-4 border-b font-bold text-lg" {...props}>
      {children}
    </div>
  );
}
export function DialogContent({ children, ...props }) {
  return (
    <div className="p-6" {...props}>
      {children}
    </div>
  );
}
export function DialogActions({ children, ...props }) {
  return (
    <div className="px-6 py-4 border-t flex gap-3 justify-end" {...props}>
      {children}
    </div>
  );
}
