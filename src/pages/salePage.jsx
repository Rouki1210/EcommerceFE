import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/feature/ProductCard";
import { useProducts } from "../hooks/useProducts";
import {
  Button,
  Typography,
  Box,
  tw,
  colors,
  gradients,
} from "../assets/theme";

const DISCOUNT_TIERS = [80, 90, 100];

export default function SalePage() {
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const navigate = useNavigate();
  const { data: products = [] } = useProducts();

  const saleProducts = useMemo(() => {
    let filtered = products.filter((p) => Math.random() > 0.6);
    if (selectedDiscount) {
      filtered = filtered.filter((p) => {
        const discountPercent =
          Math.floor(Math.random() * 50) + selectedDiscount;
        return discountPercent >= selectedDiscount;
      });
    }
    return filtered.slice(0, 12);
  }, [selectedDiscount, products]);

  return (
    <>
      {/* Banner */}
      <Box
        className="py-16 px-6 text-center"
        style={{
          background: gradients.gold,
          color: colors.white,
        }}
      >
        <Typography
          variant="h2"
          className="font-bold mb-3 leading-tight"
          style={{ fontSize: "2.8rem" }}
        >
          End of Season Sale
        </Typography>
        <Typography variant="body1" className="opacity-90">
          Up to 70% off our favourite pieces. Limited time only.
        </Typography>
      </Box>

      {/* Discount Filters */}
      <Box className="max-w-5xl mx-auto py-10 px-6 flex gap-3 justify-center flex-wrap">
        <Button
          onClick={() => setSelectedDiscount(null)}
          variant={selectedDiscount === null ? "contained" : "outlined"}
          color={selectedDiscount === null ? "primary" : "inherit"}
          className={`min-w-[120px] ${selectedDiscount === null ? tw["btn-primary-gold"] : tw["btn-secondary"]}`}
        >
          All Discounts
        </Button>
        {DISCOUNT_TIERS.map((d) => (
          <Button
            key={d}
            onClick={() => setSelectedDiscount(d)}
            variant={selectedDiscount === d ? "contained" : "outlined"}
            color={selectedDiscount === d ? "primary" : "inherit"}
            className={`min-w-[120px] ${selectedDiscount === d ? tw["btn-primary-gold"] : tw["btn-secondary"]}`}
          >
            {d}% and up
          </Button>
        ))}
      </Box>

      {/* Products Section */}
      <Box className="max-w-5xl mx-auto px-6 pb-16">
        {saleProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="cursor-pointer"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <Box className="flex flex-col items-center justify-center min-h-[300px]">
            <Typography variant="body2" className="text-muted">
              No products found for the selected discount.
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}
