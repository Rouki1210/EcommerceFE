import { Navigate, useLocation } from "react-router-dom";

function hasAdminSession() {
  if (typeof window === "undefined") {
    return false;
  }

  return localStorage.getItem("adminAuth") === "true";
}

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!hasAdminSession()) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
}
