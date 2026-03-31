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

export default function ShoppingCart() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  usePageTitle("Shopping Cart");

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
  };

  const handleRemove = (id) => {
    setRemovingId(id);
    setTimeout(() => dispatch(removeItem(id)), 350);
  };

  return (
    <div className="container cart-root">
      <div className="mb-8">
        <h1 className="heading mb-2">Shopping Cart</h1>
        <p className="text-muted">
          {cart.length} item{cart.length !== 1 ? "s" : ""} in your bag
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-main mb-4">Your cart is empty</p>
          <button onClick={() => navigate("/")} className="btn btn-primary">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-3 card overflow-hidden">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className={`item-row cart-item${removingId === item.cartItemId ? " removing" : ""}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <div>
                    <p className="font-medium text-main mb-1">{item.name}</p>
                    <p className="text-xs text-muted">{item.variant}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 border border-sub rounded-full p-1">
                      <button
                        onClick={() =>
                          updateCartItem(
                            item.cartItemId,
                            Math.max(1, item.qty - 1),
                          )
                        }
                        className="qty-btn w-6 h-6 flex items-center justify-center text-main rounded-full"
                      >
                        −
                      </button>
                      <span className="text-xs text-center w-5">
                        {item.qty}
                      </span>
                      <button
                        onClick={() =>
                          updateCartItem(item.cartItemId, item.qty + 1)
                        }
                        className="qty-btn w-6 h-6 flex items-center justify-center text-main rounded-full"
                      >
                        +
                      </button>
                    </div>
                    {/* Price */}
                    <div className="text-right">
                      <p className="font-medium text-main">
                        ${(parseFloat(item.price || 0) * item.qty).toFixed(2)}
                      </p>
                      {item.qty > 1 && (
                        <p className="text-xs text-muted">
                          ${parseFloat(item.price || 0).toFixed(2)} each
                        </p>
                      )}
                    </div>
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item.cartItemId)}
                      className="remove-btn text-2xl"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="card bg-main/5 p-6 h-fit sticky top-5">
            <h3 className="font-semibold mb-4 text-main">Order Summary</h3>

            {/* Promo Code */}
            <div className="mb-4">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code"
                className="input promo-input mb-2"
              />
              <button
                onClick={handleApplyPromo}
                disabled={pricing.promoApplied}
                className={`btn w-full mb-4 ${
                  pricing.promoApplied
                    ? "btn-disabled text-success border-sub cursor-default"
                    : "btn-primary border-sub hover:bg-main hover:text-white"
                }`}
              >
                {pricing.promoApplied ? "Applied ✓" : "Apply"}
              </button>
            </div>

            {/* Pricing Rows */}
            <div className="flex justify-between text-xs text-muted py-2 border-b border-sub">
              <span>Subtotal</span>
              <span>${pricing.subtotal.toFixed(2)}</span>
            </div>

            {pricing.discount > 0 && (
              <div className="flex justify-between text-xs text-success py-2 border-b border-sub">
                <span>Discount</span>
                <span>-${pricing.discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-xs text-muted py-2 border-b border-sub">
              <span>Shipping</span>
              <span>
                {pricing.shipping === 0
                  ? "Free"
                  : `$${pricing.shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between text-lg font-semibold py-4 text-main">
              <span>Total</span>
              <span>${pricing.total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="btn btn-primary w-full checkout-btn"
            >
              Proceed to Checkout
            </button>

            <p className="text-center text-xs text-muted mt-3">
              Free shipping on orders over ${SHIPPING_THRESHOLD}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
