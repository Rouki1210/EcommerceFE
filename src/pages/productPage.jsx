import { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

function Accordion({ title, children }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-t border-[#ece7e0]">
            <button
                onClick={() => setOpen((v) => !v)}
                className="w-full flex items-center justify-between py-4 text-sm text-[#2c2c2c] hover:text-[#c8a96e] transition-colors"
            >
                <span className="tracking-wide font-medium">{title}</span>
                <span
                    className="text-lg leading-none transition-transform duration-300"
                    style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                    +
                </span>
            </button>
            <div
                style={{
                    maxHeight: open ? 400 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.35s cubic-bezier(0.22,1,0.36,1)",
                }}
            >
                <div className="pb-4">{children}</div>
            </div>
        </div>
    );
}

export default function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useOutletContext();
    const { products } = useProducts();

    const product = products.find((p) => p.id === Number(id));
    const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] ?? null);
    const [added, setAdded] = useState(false);

    /* ── Not found ── */
    if (!product) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-[#888]">
                <p className="heading text-3xl text-[#2c2c2c]">Product not found</p>
                <p className="text-sm">The item you're looking for doesn't exist.</p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-2 text-xs tracking-widest uppercase border border-[#2c2c2c] text-[#2c2c2c] px-6 py-2.5 rounded-full hover:bg-[#2c2c2c] hover:text-white transition-all"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null;

    const handleAddToCart = () => {
        const colorPart = product.variant?.split(" / ")[0] ?? product.name;
        const updatedVariant = selectedSize ? `${colorPart} / ${selectedSize}` : product.variant;
        addToCart({ ...product, variant: updatedVariant, selectedSize });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <>
            <style>{`
                @keyframes fadeIn { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
                .fade-in { animation: fadeIn 0.45s ease both; }
            `}</style>

            <div className="max-w-6xl mx-auto px-6 py-10">

                {/* ── Back button ── */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1.5 text-xs tracking-widest uppercase text-[#aaa] hover:text-[#2c2c2c] transition-colors mb-8"
                >
                    ← Back
                </button>

                {/* ── Two-column layout ── */}
                <div className="grid md:grid-cols-[45%_55%] gap-10 items-start">

                    {/* ── LEFT: Image ── */}
                    <div className="md:sticky md:top-24 fade-in">
                        <div className="relative rounded-3xl overflow-hidden bg-[#ece7e0] aspect-[4/5]">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {product.badge && (
                                <div
                                    className="absolute top-4 left-4 text-white text-[10px] tracking-widest uppercase px-3 py-1 rounded-full"
                                    style={{ background: product.badge === "Sale" ? "#c0392b" : "#2c2c2c" }}
                                >
                                    {product.badge}
                                </div>
                            )}
                            {discount && (
                                <div className="absolute top-4 right-4 bg-[#c0392b] text-white text-[10px] tracking-widest uppercase px-3 py-1 rounded-full">
                                    −{discount}%
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── RIGHT: Details ── */}
                    <div className="fade-in" style={{ animationDelay: "0.08s" }}>

                        {/* Category + Name */}
                        <p className="text-xs tracking-widest uppercase text-[#c8a96e] mb-2">{product.category}</p>
                        <h1 className="heading text-4xl text-[#2c2c2c] leading-tight mb-1">{product.name}</h1>
                        <p className="text-sm text-[#aaa] mb-5">{product.variant}</p>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-6">
                            {product.originalPrice && (
                                <span className="text-lg text-[#bbb] line-through">${product.originalPrice}</span>
                            )}
                            <span
                                className="heading text-3xl"
                                style={{ color: product.originalPrice ? "#c0392b" : "#2c2c2c" }}
                            >
                                ${product.price}
                            </span>
                            {discount && (
                                <span className="text-xs tracking-widest uppercase bg-[#fdecea] text-[#c0392b] px-2.5 py-1 rounded-full">
                                    Save {discount}%
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-sm text-[#666] leading-relaxed mb-6">{product.description}</p>

                        {/* Material */}
                        <div className="flex items-start gap-2 text-sm text-[#555] mb-6 p-3 bg-white rounded-2xl border border-[#ece7e0]">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8a96e" strokeWidth="1.5" className="mt-0.5 flex-shrink-0">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            <div>
                                <p className="text-[10px] tracking-widest uppercase text-[#c8a96e] mb-0.5">Material</p>
                                <p>{product.material}</p>
                            </div>
                        </div>

                        {/* Size selector */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-xs tracking-widest uppercase text-[#888]">Size</p>
                                    {selectedSize && (
                                        <p className="text-xs text-[#c8a96e] tracking-wide">
                                            Selected: {selectedSize}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className="px-4 py-2 rounded-xl text-xs tracking-widest uppercase transition-all border"
                                            style={{
                                                background: selectedSize === size ? "#2c2c2c" : "white",
                                                color: selectedSize === size ? "#f5f0eb" : "#555",
                                                borderColor: selectedSize === size ? "#2c2c2c" : "#ddd",
                                            }}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Add to Cart button */}
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-4 rounded-2xl text-sm tracking-widest uppercase font-medium transition-all mb-4"
                            style={{
                                background: added ? "#3a7a4a" : "#2c2c2c",
                                color: "#fff",
                            }}
                        >
                            {added ? "Added to Cart ✓" : "Add to Cart"}
                        </button>

                        {/* Trust badges */}
                        <p className="text-center text-xs text-[#bbb] tracking-wide mb-6">
                            Free returns · Secure checkout · Free shipping over $300
                        </p>

                        {/* ── Accordions ── */}
                        <div className="border-b border-[#ece7e0]">

                            {/* Size Chart */}
                            {product.sizeChart && (
                                <Accordion title="Size Chart">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-xs text-[#555]">
                                            <thead>
                                                <tr className="border-b border-[#ece7e0]">
                                                    {product.sizeChart.headers.map((h) => (
                                                        <th
                                                            key={h}
                                                            className="text-left py-2 pr-4 text-[10px] tracking-widest uppercase text-[#aaa] font-normal"
                                                        >
                                                            {h}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {product.sizeChart.rows.map((row, i) => (
                                                    <tr
                                                        key={i}
                                                        className="border-b border-[#f5f0eb]"
                                                        style={{ background: i % 2 === 0 ? "transparent" : "#faf8f5" }}
                                                    >
                                                        {row.map((cell, j) => (
                                                            <td
                                                                key={j}
                                                                className="py-2.5 pr-4"
                                                                style={{ fontWeight: j === 0 ? 500 : 400 }}
                                                            >
                                                                {cell}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Accordion>
                            )}

                            {/* Care Instructions */}
                            {product.care && (
                                <Accordion title="Care Instructions">
                                    <ul className="space-y-2">
                                        {product.care.split(" · ").map((instruction, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-[#666]">
                                                <span className="text-[#c8a96e] mt-0.5 flex-shrink-0">·</span>
                                                {instruction}
                                            </li>
                                        ))}
                                    </ul>
                                </Accordion>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
