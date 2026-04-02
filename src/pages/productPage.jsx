import { useMemo } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import ProductPageContent from "../components/base/ProductPageContent";
import { useProducts } from "../hooks/useProducts";
import { usePageTitle } from "../hooks/usePageTitle";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useOutletContext();
  const { products, loading } = useProducts();
  const product = useMemo(
    () => products.find((p) => String(p.id) === String(id)),
    [products, id],
  );
  const shippingThreshold =
    import.meta.env.VITE_REACT_APP_SHIPPING_THRESHOLD || 100;

  usePageTitle(product?.name || "Product");

  return (
    <ProductPageContent
      loading={loading}
      product={product}
      shippingThreshold={shippingThreshold}
      onBack={() => navigate(-1)}
      onGoHome={() => navigate("/")}
      onAddToCart={addToCart}
    />
  );
}
