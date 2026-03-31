export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div
      key={message}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#2c2c2c] text-white px-5 py-3 rounded-full text-xs tracking-wide shadow-xl pointer-events-none"
      style={{ animation: "toastIn 2.2s ease forwards" }}
    >
      ✦ {message}
    </div>
  );
}
