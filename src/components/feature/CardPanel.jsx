import { useState } from "react";
import { SHIPPING_THRESHOLD } from "../../data/constants";
import CardItem from "./CardItem";

function CartPanel({ cart, onUpdateQty, onClose, onRemoveItem, onCheckout }) {
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  const handleRemove = (id) => {
    setRemovingId(id);
    setTimeout(() => {
      onRemoveItem(id);
      setRemovingId(null);
    }, 350);
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") setPromoApplied(true);
  };

  const subtotal = cart.reduce(
    (s, i) => s + parseFloat(i.price || 0) * i.qty,
    0,
  );
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : 15;
  const total = subtotal - discount + shipping;
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const progressPct = Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100);

  const handleCheckout = () => {
    onCheckout({
      cart,
      subtotal,
      discount,
      shipping,
      total,
      promoApplied,
      promoCode,
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
        style={{ animation: "fadeIn 0.25s ease" }}
      />

      <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
            `}</style>
      {/* ...existing code... */}
    </>
  );
}

export default CartPanel;
