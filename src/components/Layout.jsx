import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import Navbar from "./Navbar";
import CartPanel from "./CardPanel";
import Toast from "./Toast";
import Footer from "./Footer";
import ProductModal from "./ProductModal";

export default function Layout() {
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {
    cart,
    setCart,
    cartCount,
    addToCart,
    updateQty,
    removeItem,
    toastMsg,
  } = useCart();
  const navigate = useNavigate();

  const goToCartPage = (orderData) => {
    setCartOpen(false);
    navigate("/shopping-cart", { state: orderData });
  };

  const outletContext = {
    cart,
    setCart,
    cartCount,
    addToCart,
    updateQty,
    removeItem,
    openCart: () => setCartOpen(true),
    openProductModal: (product) => setSelectedProduct(product),
  };

  return (
    <div
      className="min-h-screen bg-[#f5f0eb]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');
                .heading { font-family: 'Playfair Display', serif; }
            `}</style>

      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onLogoClick={() => navigate("/")}
      />

      <Outlet context={outletContext} />

      <Footer />

      {cartOpen && (
        <CartPanel
          cart={cart}
          onUpdateQty={updateQty}
          onRemoveItem={removeItem}
          onClose={() => setCartOpen(false)}
          onCheckout={goToCartPage}
        />
      )}

      <Toast message={toastMsg} />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product) => {
            addToCart(product);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}
