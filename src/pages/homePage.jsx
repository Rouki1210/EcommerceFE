import { useOutletContext } from "react-router-dom";
import Hero from "../components/Hero";
import MarqueeStrip from "../components/MarqueeStrip";
import ProductGrid from "../components/Productgrid";
import EditorialBanner from "../components/Editorialbanner";

export default function HomePage() {
  const { addToCart, openCart, openProductModal } = useOutletContext();

  const scrollToProducts = () =>
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <Hero onShopNow={scrollToProducts} />
      <MarqueeStrip />
      <ProductGrid onAddToCart={addToCart} onViewDetail={openProductModal} />
      <EditorialBanner onCtaClick={openCart} />
    </>
  );
}
