import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SHIPPING_THRESHOLD } from "../data/constants";
import { usePageTitle } from "../hooks/usePageTitle";
import {
  selectCartItems,
  updateQty,
  removeItem,
} from "../features/cart/cartSlice";
import { tw } from "../assets/theme/theme";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function ShoppingCart() {
  const navigate = useNavigate();
  const navigate = useNavigate();
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    updateCartItem,
    removeFromCart,
    addToCart: addToCartGlobal,
  } = useOutletContext();
  const { products } = useProducts();
  usePageTitle("Shopping Cart");

  const [promoCode, setPromoCode] = useState(state?.promoCode ?? "");
  const [promoApplied, setPromoApplied] = useState(
    state?.promoApplied ?? false,
  );
  const [removingId, setRemovingId] = useState(null);

  const [promoCode, setPromoCode] = useState(state?.promoCode ?? "");
  const [promoApplied, setPromoApplied] = useState(
    state?.promoApplied ?? false,
  );
  const [removingId, setRemovingId] = useState(null);

  const calculatePricing = () => {
    const subtotal = cart.reduce(
      (sum, item) => sum + parseFloat(item.price || 0) * item.qty,
      0,
    );
    const subtotal = cart.reduce(
      (sum, item) => sum + parseFloat(item.price || 0) * item.qty,
      0,
    );
    const shippingThreshold = SHIPPING_THRESHOLD || 100;
    const shipping = subtotal >= shippingThreshold ? 0 : 15;
    const discount = promoApplied ? subtotal * 0.1 : 0;
    const total = subtotal - discount + shipping;
    return { subtotal, shipping, discount, total, promoApplied };
  };

  const pricing = calculatePricing();

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { ...pricing, promoCode, cart } });
  };

  const updateCartItem = (cartItemId, newQty) => {
    const item = cart.find((i) => i.cartItemId === cartItemId);
    if (item) {
      const delta = newQty - item.qty;
      dispatch(updateQty({ cartItemId, delta }));
    }
    navigate("/checkout", { state: { ...pricing, promoCode, cart } });
  };

  const updateCartItem = (cartItemId, newQty) => {
    const item = cart.find((i) => i.cartItemId === cartItemId);
    if (item) {
      const delta = newQty - item.qty;
      dispatch(updateQty({ cartItemId, delta }));
    }
  };

  const handleRemove = (id) => {
    setRemovingId(id);
    setTimeout(() => dispatch(removeItem(id)), 350);
  };

  const promoBtnClassName = cx(
    tw.cartPagePromoBtn,
    pricing.promoApplied && tw.cartPagePromoApplied,
  );

  return (
    <div className={tw.cartPage}>
      <div className={tw.cartPageHeader}>
        <h1 className={cx("heading", tw.cartPageTitle)}>Shopping Cart</h1>
        <p className={tw.cartPageSubtitle}>
          {cart.length} item{cart.length !== 1 ? "s" : ""} in your bag
        </p>
      </div>

      {cart.length === 0 ? (
        <div className={tw.cartPageEmpty}>
          <p className={tw.collectionEmptyTitle}>Your cart is empty</p>
          <button onClick={() => navigate("/")} className={tw.cartPageEmptyBtn}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className={tw.cartPageLayout}>
          <div className={tw.cartPageItems}>
            {cart.map((item) => {
              const rowClassName = cx(
                tw.cartPageItem,
                removingId === item.cartItemId && tw.cartPageItemRemoving,
              );

              return (
                <div key={item.cartItemId} className={rowClassName}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={tw.cartPageItemImage}
                  />

                  <div className={tw.cartPageItemDetails}>
                    <div>
                      <p className={tw.cartPageItemName}>{item.name}</p>
                      <p className={tw.cartPageItemVariant}>{item.variant}</p>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className={tw.cartPageQty}>
                        <button
                          onClick={() =>
                            updateCartItem(
                              item.cartItemId,
                              Math.max(1, item.qty - 1),
                            )
                          }
                          className={tw.cartPageQtyBtn}
                        >
                          −
                        </button>
                        <span className="text-xs w-5 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() =>
                            updateCartItem(item.cartItemId, item.qty + 1)
                          }
                          className={tw.cartPageQtyBtn}
                        >
                          +
                        </button>
                      </div>

                      <div className={tw.cartPagePriceBox}>
                        <p className={tw.cartPagePrice}>
                          ${(parseFloat(item.price || 0) * item.qty).toFixed(2)}
                        </p>
                        {item.qty > 1 && (
                          <p className={tw.cartPageEach}>
                            ${parseFloat(item.price || 0).toFixed(2)} each
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => handleRemove(item.cartItemId)}
                        className={tw.cartPageRemove}
                        aria-label="Remove item"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={tw.cartPageSummary}>
            <h3 className={tw.cartPageSummaryTitle}>Order Summary</h3>

            <div className="mb-4">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code"
                className={tw.cartPagePromoInput}
              />
              <button
                onClick={handleApplyPromo}
                disabled={pricing.promoApplied}
                className={promoBtnClassName}
              >
                {pricing.promoApplied ? "Applied ✓" : "Apply"}
              </button>
            </div>

            <div className={tw.cartPageRow}>
              <span>Subtotal</span>
              <span>${pricing.subtotal.toFixed(2)}</span>
            </div>

            {pricing.discount > 0 && (
              <div className={cx(tw.cartPageRow, tw.cartPageRowDiscount)}>
                <span>Discount</span>
                <span>-${pricing.discount.toFixed(2)}</span>
              </div>
            )}

            <div className={tw.cartPageRow}>
              <span>Shipping</span>
              <span>
                {pricing.shipping === 0
                  ? "Free"
                  : `$${pricing.shipping.toFixed(2)}`}
              </span>
            </div>

            <div className={tw.cartPageTotal}>
              <span>Total</span>
              <span>${pricing.total.toFixed(2)}</span>
            </div>

            <button onClick={handleCheckout} className={tw.cartPageCheckout}>
              Proceed to Checkout
            </button>

            <p className={tw.cartPageHint}>
              Free shipping on orders over ${SHIPPING_THRESHOLD}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
