import { useState } from "react";
import { SHIPPING_THRESHOLD } from "../data/constants";
import CartItem from "./CardItem";


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

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
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
            {/* Drawer */}
            <div
                className="fixed right-0 top-0 h-full w-full max-w-md bg-[#f5f0eb] z-50 flex flex-col shadow-2xl"
                style={{ animation: "slideIn 0.35s cubic-bezier(0.22,1,0.36,1)" }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-[#e8e2db]">
                    <div>
                        <p className="text-xs tracking-widest text-[#999] uppercase">Your Selection</p>
                        <h2 className="heading text-2xl text-[#2c2c2c]">Cart ({cartCount})</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-full border border-[#ddd] flex items-center justify-center text-[#888] hover:border-[#2c2c2c] hover:text-[#2c2c2c] transition-all"
                    >
                        ×
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                    {/* Free shipping progress */}
                    {shipping > 0 && (
                        <div className="bg-white rounded-2xl px-4 py-3">
                            <div className="flex justify-between text-xs text-[#888] mb-2">
                                <span>
                                    Add{" "}
                                    <span className="font-medium text-[#2c2c2c]">
                                        ${(SHIPPING_THRESHOLD - subtotal).toFixed(0)}
                                    </span>{" "}
                                    for free shipping
                                </span>
                                <span>${SHIPPING_THRESHOLD}</span>
                            </div>
                            <div className="h-1 bg-[#eee] rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-[#c8a96e]"
                                    style={{
                                        width: `${progressPct}%`,
                                        transition: "width 0.6s cubic-bezier(0.22,1,0.36,1)",
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {shipping === 0 && cart.length > 0 && (
                        <div className="bg-[#eaf4ee] text-[#3a7a4a] text-xs tracking-wide rounded-2xl px-4 py-3 flex items-center gap-2">
                            <span>✦</span> Free shipping unlocked!
                        </div>
                    )}

                    {/* Items */}
                    {cart.length === 0 ? (
                        <div className="py-16 text-center text-[#bbb]">
                            <p className="heading text-xl mb-1">Your cart is empty</p>
                            <p className="text-sm">Discover something beautiful</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl overflow-hidden">
                            {cart.map((item, i) => (
                                <div key={item.cartItemId}>
                                    <CartItem
                                        item={item}
                                        onUpdateQty={onUpdateQty}
                                        onRemove={handleRemove}
                                        isRemoving={removingId === item.cartItemId}
                                    />
                                    {i < cart.length - 1 && <div className="mx-4 h-px bg-[#f2f2f2]" />}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer summary */}
                {cart.length > 0 && (
                    <div className="px-6 py-5 bg-white border-t border-[#e8e2db]">
                        {/* Promo */}
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                placeholder="Promo code (SAVE10)"
                                className="flex-1 border border-[#e5e5e5] rounded-xl px-3 py-2 text-xs text-[#444] bg-[#fafafa] focus:outline-none focus:border-[#2c2c2c] transition-colors"
                            />
                            <button
                                onClick={applyPromo}
                                disabled={promoApplied}
                                className="px-4 py-2 rounded-xl text-xs font-medium border border-[#2c2c2c] text-[#2c2c2c] hover:bg-[#2c2c2c] hover:text-white transition-all disabled:opacity-40"
                            >
                                {promoApplied ? "✓" : "Apply"}
                            </button>
                        </div>

                        {/* Price breakdown */}
                        <div className="space-y-1.5 text-xs text-[#888] mb-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="text-[#2c2c2c]">${subtotal}</span>
                            </div>
                            {promoApplied && (
                                <div className="flex justify-between text-[#3a7a4a]">
                                    <span>SAVE10</span>
                                    <span>−${discount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className={shipping === 0 ? "text-[#3a7a4a]" : "text-[#2c2c2c]"}>
                                    {shipping === 0 ? "Free" : `$${shipping}`}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between items-baseline mb-4">
                            <span className="heading text-base text-[#2c2c2c]">Total</span>
                            <span className="heading text-xl text-[#2c2c2c]">${total.toFixed(2)}</span>
                        </div>

                        <button 
                            className="w-full bg-[#2c2c2c] text-white rounded-2xl py-3.5 text-xs tracking-widest uppercase hover:bg-[#111] hover:tracking-[0.12em] transition-all"
                            onClick={handleCheckout}
                        >
                            Checkout →
                        </button>

                        <p className="text-center text-[10px] text-[#bbb] mt-3 tracking-wide">
                            Secure checkout · Free returns · SSL encrypted
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}

export default CartPanel;