import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Layout from "../components/feature/Layout";
import Home from "../pages/homePage";
import ShoppingCart from "../pages/shoppingCart";
import CollectionPage from "../pages/collectionPage";
import SalePage from "../pages/salePage";
import ProductPage from "../pages/productPage";
import LoginPage from "../pages/loginPage";
import RegisterPage from "../pages/registerPage";
import AccountSettingsPage from "../pages/accountSettingsPage";
import MyOrdersPage from "../pages/myOrdersPage";
import OrderTracking from "../pages/orderTracking";
import CheckoutPage from "../pages/checkoutPage";
import OurStoryPage from "../pages/ourStoryPage";
import AdminLayout from "../components/feature/admin/AdminLayout";
import ProtectedRoute from "../components/feature/admin/ProtectedRoute";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminAnalytics from "../pages/admin/AdminAnalytics";
import AdminSettings from "../pages/admin/AdminSettings";

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
          <Route path="/orders" element={<MyOrdersPage />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/profile" element={<AccountSettingsPage />} />
        </Route>

        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
