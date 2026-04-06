import { useOutletContext } from "react-router-dom";
import Hero from "../components/feature/Hero";
import MarqueeStrip from "../components/feature/MarqueeStrip";
import ProductGrid from "../components/feature/Productgrid";
import EditorialBanner from "../components/feature/Editorialbanner";
import { usePageTitle } from "../hooks/usePageTitle";

export default function HomePage() {
  const { addToCart, openCart, openProductModal } = useOutletContext();

  usePageTitle("Home");

  const scrollToProducts = () =>
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <Hero onShopNow={scrollToProducts} />
      <MarqueeStrip />
      <ProductGrid onAddToCart={addToCart} onOpenQuickView={openProductModal} />
      <EditorialBanner onCtaClick={openCart} />
    </>
  );
}
