import { useOutletContext } from "react-router-dom";
import Hero from "../components/Hero";
import MarqueeStrip from "../components/MarqueeStrip";
import ProductGrid from "../components/Productgrid";
import EditorialBanner from "../components/Editorialbanner";
import { useCategories } from "../data/useCategories";
import { usePageTitle } from "../hooks/usePageTitle";
import { colors, shadows, keyframes } from "../assets/theme/theme";

export default function HomePage() {
  const { addToCart, openCart, openProductModal } = useOutletContext();

  usePageTitle("Home");

  const scrollToProducts = () =>
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });

  const categories = useCategories();
  console.log("Fetched categories:", categories);

  return (
    <>
      <Hero onShopNow={scrollToProducts} />
      <MarqueeStrip />
      <ProductGrid onAddToCart={addToCart} onViewDetail={openProductModal} />
      <EditorialBanner onCtaClick={openCart} />
    </>
  );
}
