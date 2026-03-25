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
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-4xl text-[#2c2c2c] mb-2 font-bold">
          Shopping Cart
        </h1>
        <p className="text-sm text-[#999]">
          {cart.length} item{cart.length !== 1 ? "s" : ""} in your bag
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-[#2c2c2c] mb-4">Your cart is empty</p>
          <button onClick={() => navigate("/")} className="btn-primary-enabled">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-3 bg-[#f5f0eb] rounded-lg shadow-lg overflow-hidden">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="cart-item"
                style={{
                  opacity: removingId === item.cartItemId ? 0 : 1,
                  transform:
                    removingId === item.cartItemId
                      ? "translateX(28px)"
                      : "translateX(0)",
                  transition: "opacity 0.35s ease, transform 0.35s ease",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <div>
                    <p className="text-sm text-[#2c2c2c] mb-1 font-medium">
                      {item.name}
                    </p>
                    <p className="text-xs text-[#999]">{item.variant}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 border border-[#e5e5e5] rounded-full p-1">
                      <button
                        onClick={() =>
                          updateCartItem(
                            item.cartItemId,
                            Math.max(1, item.qty - 1),
                          )
                        }
                        className="w-6 h-6 flex items-center justify-center text-[#2c2c2c] hover:bg-[#2c2c2c] hover:text-[#f5f0eb] rounded-full transition-all"
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
                        className="w-6 h-6 flex items-center justify-center text-[#2c2c2c] hover:bg-[#2c2c2c] hover:text-[#f5f0eb] rounded-full transition-all"
                      >
                        +
                      </button>
                    </div>
                    {/* Price */}
                    <div className="text-right">
                      <p className="text-sm text-[#2c2c2c] font-medium">
                        ${(parseFloat(item.price || 0) * item.qty).toFixed(2)}
                      </p>
                      {item.qty > 1 && (
                        <p className="text-xs text-[#999]">
                          ${parseFloat(item.price || 0).toFixed(2)} each
                        </p>
                      )}
                    </div>
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item.cartItemId)}
                      className="text-[#999] text-2xl hover:text-[#c0392b] transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-[#f5f0eb] rounded-lg p-6 h-fit sticky top-5 shadow-lg">
            <h3 className="text-base text-[#2c2c2c] mb-4 font-semibold">
              Order Summary
            </h3>

            {/* Promo Code */}
            <div className="mb-4">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code"
                className="form-input-default w-full mb-2"
              />
              <button
                onClick={handleApplyPromo}
                disabled={pricing.promoApplied}
                className={`w-full py-2.5 px-4 border rounded-lg font-medium transition-all mb-4 ${
                  pricing.promoApplied
                    ? "bg-[#27ae60]/20 text-[#27ae60] border-[#e5e5e5] cursor-default"
                    : "bg-[#f5f0eb] text-[#2c2c2c] border-[#e5e5e5] hover:bg-[#2c2c2c] hover:text-white"
                }`}
              >
                {pricing.promoApplied ? "Applied ✓" : "Apply"}
              </button>
            </div>

            {/* Pricing Rows */}
            <div className="flex justify-between text-xs text-[#999] py-2 border-b border-[#e5e5e5]">
              <span>Subtotal</span>
              <span>${pricing.subtotal.toFixed(2)}</span>
            </div>

            {pricing.discount > 0 && (
              <div className="flex justify-between text-xs text-[#27ae60] py-2 border-b border-[#e5e5e5]">
                <span>Discount</span>
                <span>-${pricing.discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-xs text-[#999] py-2 border-b border-[#e5e5e5]">
              <span>Shipping</span>
              <span>
                {pricing.shipping === 0
                  ? "Free"
                  : `$${pricing.shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between text-lg font-semibold py-4 text-[#2c2c2c]">
              <span>Total</span>
              <span>${pricing.total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="btn-primary-enabled w-full"
            >
              Proceed to Checkout
            </button>

            <p className="text-center text-xs text-[#999] mt-3">
              Free shipping on orders over ${SHIPPING_THRESHOLD}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
