import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import AdminLayout from "../components/admin/AdminLayout";
import Admindashboard from "../pages/admin/Admindashboard";
import Adminproducts from "../pages/admin/Adminproducts";
import Adminorders from "../pages/admin/Adminorders";
import Adminusers from "../pages/admin/Adminusers";
import Adminanalytics from "../pages/admin/Adminanalytics";
import Adminsettings from "../pages/admin/Adminsettings";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
        {/*<Route path="/admin" element={<AdminLayout />}>

          {/* User routes */}
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
          </Route>

          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Admindashboard />} />
            <Route path="products"  element={<Adminproducts />} />
            <Route path="orders"    element={<Adminorders />} />
            <Route path="users"     element={<Adminusers />} />
            <Route path="analytics" element={<Adminanalytics />} />
            <Route path="settings"  element={<Adminsettings />} />
          </Route>

        </Routes>
      </BrowserRouter>
  );
}

export default AppRoutes;