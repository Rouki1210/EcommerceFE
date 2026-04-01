import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import Navbar from "./Navbar";
import CartPanel from "./CardPanel";
import Toast from "./Toast";
import Footer from "./Footer";
import ProductModal from "./ProductModal";
import { tw } from "../../assets/theme/theme";

export default function Layout() {
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { cart, cartCount, addToCart, updateQty, removeItem, toastMsg } =
    useCart();
  const navigate = useNavigate();

  const goToCartPage = (orderData) => {
    setCartOpen(false);
    navigate("/shopping-cart", { state: orderData });
  };

  const outletContext = {
    cart,
    cartCount,
    addToCart,
    updateQty,
    removeItem,
    openCart: () => setCartOpen(true),
    openProductModal: (product) => setSelectedProduct(product),
  };

  return (
    <div className={tw.appShell}>
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
