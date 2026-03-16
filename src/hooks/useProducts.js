import { useEffect, useState } from "react";
import { PRODUCTS } from "../data/constants";
import { getProducts } from "../api/productApi";

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";

export function useProducts() {
  const [products, setProducts] = useState(USE_MOCK ? PRODUCTS : []);
  const [loading, setLoading] = useState(!USE_MOCK);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (USE_MOCK) return;
    getProducts()
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data && Array.isArray(data.content)) {
          setProducts(data.content);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}
