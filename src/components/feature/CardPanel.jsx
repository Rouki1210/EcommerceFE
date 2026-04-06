import { useEffect, useId, useMemo, useRef, useState } from "react";
import { SHIPPING_THRESHOLD } from "../../data/constants";
import CardItem from "./CardItem";
import { tw } from "../../assets/theme/theme";
import { cx } from "@lib/cx";
import { useDismissibleLayer } from "../../hooks/useDismissibleLayer";
import {
  calculateCartPricing,
  getCartItemCount,
  getFreeShippingProgress,
  isValidPromoCode,
} from "../../lib/cartPricing";

function CartPanel({ cart, onUpdateQty, onClose, onRemoveItem, onCheckout }) {
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const drawerRef = useRef(null);
  const removeTimeoutRef = useRef(null);
  const closeButtonRef = useRef(null);
  const dialogTitleId = useId();

  useDismissibleLayer({
    isOpen: true,
    onDismiss: onClose,
    lockBodyScroll: true,
    initialFocusRef: closeButtonRef,
    closeOnOutsidePress: true,
    outsidePressRef: drawerRef,
  });

  useEffect(() => {
    return () => {
      if (removeTimeoutRef.current) {
        clearTimeout(removeTimeoutRef.current);
      }
    };
  }, []);

  const handleRemove = (id) => {
    if (removeTimeoutRef.current) {
      clearTimeout(removeTimeoutRef.current);
    }

    setRemovingId(id);
    removeTimeoutRef.current = setTimeout(() => {
      onRemoveItem(id);
      setRemovingId(null);
      removeTimeoutRef.current = null;
    }, 350);
  };

  const applyPromo = () => {
    if (isValidPromoCode(promoCode)) setPromoApplied(true);
  };

  const pricing = useMemo(
    () =>
      calculateCartPricing(cart, {
        promoApplied,
        shippingThreshold: SHIPPING_THRESHOLD,
      }),
    [cart, promoApplied],
  );
  const cartCount = useMemo(() => getCartItemCount(cart), [cart]);
  const { progressPct, remainingForFreeShipping } = useMemo(
    () =>
      getFreeShippingProgress(pricing.subtotal, {
        shippingThreshold: SHIPPING_THRESHOLD,
      }),
    [pricing.subtotal],
  );

  const handleCheckout = () => {
    onCheckout({
      cart,
      ...pricing,
      promoCode,
    });
  };

  const promoBtnClassName = cx(
    tw.cartPanelPromoBtn,
    promoApplied && tw.cartPanelPromoBtnApplied,
  );

  return (
    <>
      <div className={tw.cartPanelBackdrop} aria-hidden="true" />

      <aside
        ref={drawerRef}
        className={tw.cartPanelDrawer}
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
      >
        <header className={tw.cartPanelHeader}>
          <h3 id={dialogTitleId} className={cx("heading", tw.cartPanelTitle)}>
            Cart ({cartCount})
          </h3>
          <button
            ref={closeButtonRef}
            type="button"
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
              <button
                type="button"
                className={tw.cartPanelEmptyBtn}
                onClick={onClose}
              >
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
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code"
                  className={tw.cartPanelPromoInput}
                  aria-label="Promo code"
                />
                <button
                  type="button"
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
                  <span>${pricing.subtotal.toFixed(2)}</span>
                </div>
                {pricing.discount > 0 && (
                  <div className={tw.cartPanelRow}>
                    <span>Discount</span>
                    <span>-${pricing.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className={tw.cartPanelRow}>
                  <span>Shipping</span>
                  <span>
                    {pricing.shipping === 0
                      ? "Free"
                      : `$${pricing.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className={tw.cartPanelTotalRow}>
                  <span>Total</span>
                  <span>${pricing.total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
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
