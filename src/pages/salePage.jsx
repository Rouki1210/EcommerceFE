import { useOutletContext } from "react-router-dom";
import { PRODUCTS } from "../data/constants";
import ProductCard from "../components/ProductCard";

export default function SalePage() {
  const { addToCart, openProductModal } = useOutletContext();
  const saleProducts = PRODUCTS.filter((p) => p.originalPrice !== undefined);

  const maxDiscount = saleProducts.reduce((max, p) => {
    const pct = Math.round(
      ((p.originalPrice - p.price) / p.originalPrice) * 100,
    );
    return pct > max ? pct : max;
  }, 0);

  return (
    <>
      <style>{`
                @keyframes slideUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
                .fade-in { animation: slideUp 0.55s ease both; }
                @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.6 } }
                .pulse { animation: pulse 2s ease-in-out infinite; }
            `}</style>

      {/* ── Sale Banner ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #8b1a1a 0%, #c0392b 50%, #8b1a1a 100%)",
          minHeight: 260,
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
          <div className="inline-flex items-center gap-2 mb-4 fade-in">
            <span className="pulse w-2 h-2 rounded-full bg-white inline-block" />
            <p className="text-xs tracking-widest uppercase text-white/70">
              Limited Time Offer
            </p>
          </div>
          <h1
            className="heading text-5xl text-white mb-3 fade-in"
            style={{ animationDelay: "0.05s" }}
          >
            End of Season Sale
          </h1>
          <p
            className="text-white/70 text-sm max-w-md mb-6 fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Up to{" "}
            <span className="text-white font-semibold">{maxDiscount}% off</span>{" "}
            on selected styles. While stocks last.
          </p>
          <div
            className="flex gap-3 fade-in"
            style={{ animationDelay: "0.15s" }}
          >
            <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
              <p className="heading text-2xl text-white">
                {saleProducts.length}
              </p>
              <p className="text-[10px] tracking-widest uppercase text-white/60">
                Items on sale
              </p>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
              <p className="heading text-2xl text-white">
                Up to {maxDiscount}%
              </p>
              <p className="text-[10px] tracking-widest uppercase text-white/60">
                Off original price
              </p>
            </div>
          </div>
        </div>

        {/* Decorative */}
        <div
          className="absolute -right-20 -top-20 w-72 h-72 rounded-full opacity-10"
          style={{ background: "white" }}
        />
        <div
          className="absolute right-20 -bottom-16 w-48 h-48 rounded-full opacity-10"
          style={{ background: "white" }}
        />
      </div>

      {/* ── Promo Code Strip ── */}
      <div className="bg-[#2c2c2c] py-3 text-center">
        <p className="text-xs tracking-widest uppercase text-[#c8a96e]">
          Stack savings — use code{" "}
          <span className="bg-[#c8a96e] text-[#2c2c2c] px-2 py-0.5 rounded font-semibold">
            SAVE10
          </span>{" "}
          at checkout for an extra 10% off
        </p>
      </div>

      {/* ── Products ── */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs tracking-widest uppercase text-[#c8a96e] mb-1">
              Maison · Sale
            </p>
            <h2 className="heading text-3xl text-[#2c2c2c]">Sale Items</h2>
          </div>
          <p className="text-sm text-[#999]">
            {saleProducts.length} item{saleProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {saleProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {saleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onViewDetail={openProductModal}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center text-[#bbb]">
            <p className="heading text-2xl">No sale items at the moment</p>
            <p className="text-sm mt-2">Check back soon for new offers</p>
          </div>
        )}
      </section>
    </>
  );
}
