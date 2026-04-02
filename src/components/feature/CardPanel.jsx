import { useState } from "react";
import { SHIPPING_THRESHOLD } from "../../data/constants";
import CardItem from "./CardItem";
import { tw } from "../../assets/theme/theme";

const cx = (...classes) => classes.filter(Boolean).join(" ");

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
  const remainingForFreeShipping = Math.max(SHIPPING_THRESHOLD - subtotal, 0);

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

  const promoBtnClassName = cx(
    tw.cartPanelPromoBtn,
    promoApplied && tw.cartPanelPromoBtnApplied,
  );

  return (
    <>
      <div className={tw.cartPanelBackdrop} onClick={onClose} />

      <aside className={tw.cartPanelDrawer}>
        <header className={tw.cartPanelHeader}>
          <h3 className={cx("heading", tw.cartPanelTitle)}>
            Cart ({cartCount})
          </h3>
          <button
            className={tw.cartPanelClose}
            onClick={onClose}
            aria-label="Close cart"
          >
            ×
          </button>
        </header>

        <div className={tw.cartPanelBody}>
          {cart.length === 0 ? (
            <div className={tw.cartPanelEmpty}>
              <p>Your cart is empty.</p>
              <button className={tw.cartPanelEmptyBtn} onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className={tw.cartPanelItems}>
                {cart.map((item) => (
                  <CardItem
                    key={item.cartItemId}
                    item={item}
                    onUpdateQty={onUpdateQty}
                    onRemove={handleRemove}
                    isRemoving={removingId === item.cartItemId}
                  />
                ))}
              </div>

              <div className={tw.cartPanelProgressBox}>
                <p className={tw.cartPanelProgressText}>
                  {remainingForFreeShipping > 0
                    ? `Add $${remainingForFreeShipping.toFixed(2)} for free shipping`
                    : "You unlocked free shipping"}
                </p>
                <div className={tw.cartPanelProgressTrack}>
                  <div
                    className={tw.cartPanelProgressFill}
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              <div className={tw.cartPanelPromoRow}>
                <input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code"
                  className={tw.cartPanelPromoInput}
                />
                <button
                  className={promoBtnClassName}
                  onClick={applyPromo}
                  disabled={promoApplied}
                >
                  {promoApplied ? "Applied" : "Apply"}
                </button>
              </div>

              <div className={tw.cartPanelSummary}>
                <div className={tw.cartPanelRow}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className={tw.cartPanelRow}>
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className={tw.cartPanelRow}>
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className={tw.cartPanelTotalRow}>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                className={tw.cartPanelCheckoutBtn}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              <p className={tw.cartPanelHint}>
                Free shipping on orders over ${SHIPPING_THRESHOLD}
              </p>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

export default CartPanel;
