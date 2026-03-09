import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/homePage";
import ShoppingCart from "../pages/shoppingCart";
import CollectionPage from "../pages/collectionPage";
import SalePage from "../pages/salePage";
import ProductPage from "../pages/productPage";
import LoginPage from "../pages/loginPage";
import RegisterPage from "../pages/registerPage";
import OrderTracking from "../pages/orderTracking";
import CheckoutPage from "../pages/checkoutPage";
import AdminLayout from "../components/admin/AdminLayout.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminOrders from "../pages/admin/AdminOrders";
// import AdminUsers from "../pages/admin/AdminUsers";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route
            path="/women"
            element={
              <CollectionPage
                gender="women"
                title="Women's Collection"
                subtitle="Refined essentials for the modern woman"
              />
            }
          />
          <Route
            path="/men"
            element={
              <CollectionPage
                gender="men"
                title="Men's Collection"
                subtitle="Understated luxury for the discerning man"
              />
            }
          />
          <Route path="/sale" element={<SalePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/our-story" element={<OurStoryPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminLayout />}>

              <Route path="dashboard" element={<AdminDashboard />} />

              <Route path="products" element={<AdminProducts />} />

              <Route path="orders" element={<AdminOrders />} />



          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
