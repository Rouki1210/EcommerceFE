import { Link } from "react-router-dom";
function Hero({ onShopNow }) {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 grid md:grid-cols-2 gap-12 items-center">
      <style>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>

      {/* Text */}
      <div>
        <p className="stagger-1 text-xs tracking-widest uppercase text-[#c8a96e] mb-4">
          Spring Collection 2025
        </p>
        <h1 className="stagger-2 heading text-5xl md:text-6xl text-[#2c2c2c] leading-tight">
          Dressed in
          <br />
          <em>quiet</em>
          <br />
          luxury.
        </h1>
        <p className="stagger-3 text-sm text-[#999] leading-relaxed mt-5 max-w-xs">
          Thoughtfully crafted pieces for the unhurried life. Natural fibres,
          considered cuts, enduring quality.
        </p>
        <div className="stagger-4 flex items-center gap-4 mt-8">
          <button
            onClick={onShopNow}
            className="bg-[#2c2c2c] text-white px-7 py-3 rounded-full text-xs tracking-widest uppercase hover:bg-[#111] hover:tracking-[0.15em] transition-all"
          >
            Shop Now
          </button>
          <Link
            to="/our-story"
            className="text-xs tracking-widest uppercase text-[#999] hover:text-[#2c2c2c] transition-colors underline underline-offset-4"
          >
            Our Story
          </Link>
        </div>
      </div>

      {/* Image collage */}
      <div className="relative h-[420px] hidden md:block">
        <div
          className="absolute right-0 top-0 w-56 h-72 rounded-3xl overflow-hidden shadow-lg"
          style={{ animation: "slideUp 0.8s 0.2s both ease" }}
        >
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop"
            alt="model"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
