import { useState } from "react";

function ProductCard({ product, onAddToCart }) {
    const [added, setAdded] = useState(false);
    const [hovered, setHovered] = useState(false);

    const handleAdd = () => {
        onAddToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
    };

    return (
        <div
            className="group relative bg-white rounded-3xl overflow-hidden"
            style={{
                boxShadow: hovered
                    ? "0 12px 40px rgba(44,44,44,0.1)"
                    : "0 2px 12px rgba(44,44,44,0.05)",
                transition: "box-shadow 0.3s ease, transform 0.3s ease",
                transform: hovered ? "translateY(-4px)" : "none",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <style>
                {`
                .group:hover .card-title {
                    color: #2c2c2c;
                    transition: color 0.3s ease;
                }
                .group:hover .card-price {
                    color: #2c2c2c;
                    transition: color 0.3s ease;
                }
            `}
            </style>
            {/* Badge */}
            {product.badge && (
                <div className="absolute top-3 left-3 z-10 bg-[#2c2c2c] text-white text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full">
                    {product.badge}
                </div>
            )}

            {/* Image */}
            <div className="relative overflow-hidden bg-[#f5f0eb] aspect-[5/6]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    style={{
                        transform: hovered ? "scale(1.06)" : "scale(1)",
                        transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                    }}
                />

                {/* Quick add overlay */}
                <div
                    className="absolute inset-x-0 bottom-0 p-3"
                    style={{
                        opacity: hovered ? 1 : 0,
                        transform: hovered ? "translateY(0)" : "translateY(8px)",
                        transition: "opacity 0.3s ease, transform 0.3s ease",
                    }}
                >
                    <button
                        onClick={handleAdd}
                        className="w-full py-2.5 rounded-xl text-xs tracking-widest uppercase font-medium transition-all"
                        style={{
                            background: added ? "#3a7a4a" : "#2c2c2c",
                            color: "#fff",
                        }}
                    >
                        {added ? "Added ✓" : "Quick Add"}
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="px-4 py-3">
                <p className="text-[10px] tracking-widest text-[#aaa] uppercase mb-0.5">{product.category}</p>
                <div className="flex items-center justify-between">
                    <p className="heading text-[15px] text-[#2c2c2c] leading-snug">{product.name}</p>
                    <p className="heading text-[15px] text-[#2c2c2c]">${product.price}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;