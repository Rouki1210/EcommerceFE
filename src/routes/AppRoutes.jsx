import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
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
import OrderTracking from "../pages/orderTracking";
import CheckoutPage from "../pages/checkoutPage";
import OurStoryPage from "../pages/ourStoryPage";
/* ========== ADMIN COMPONENTS - COMMENTED OUT TEMPORARILY ==========
import AdminLayout from "../components/feature/admin/AdminLayout";
import ProtectedRoute from "../components/feature/admin/ProtectedRoute";
import AdminLogin from "../pages/admin/AdminLogin";
import Admindashboard from "../pages/admin/Admindashboard";
import Adminproducts from "../pages/admin/Adminproducts";
import Adminorders from "../pages/admin/Adminorders";
import Adminusers from "../pages/admin/Adminusers";
import Adminanalytics from "../pages/admin/Adminanalytics";
import Adminsettings from "../pages/admin/Adminsettings";
========== END ADMIN COMPONENTS ========== */

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
          <Route path="/" element={<CollectionPage
                gender="women"
                title="Women's Collection"
                subtitle="Refined essentials for the modern woman"
              />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route
            path="/women"
            element={
              <Home/>
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
          <Route path="/product/:id" element={<CheckoutPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-tracking" element={<OurStoryPage  />} />
          <Route path="/our-story" element={< OrderTracking/>} />
          <Route path="/profile" element={<AccountSettingsPage />} />
        </Route>

        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
