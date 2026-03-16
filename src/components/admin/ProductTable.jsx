export default function ProductTable({ products = [], onEdit, onDelete }) {
    return (
        <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-6 py-4 border-b border-black/5 bg-slate-50">
                {["Product", "Category", "Price", "Stock", "Actions"].map(h => (
                    <div key={h} className="text-slate-700 text-[10px] tracking-[1.5px] font-semibold uppercase">{h}</div>
                ))}
            </div>

            {products.map((prod, i) => (
                <div
                    key={prod.id}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-6 py-3.5 border-b border-black/[0.04] hover:bg-slate-50 transition-colors"
                    style={{ animation: `fadeSlideUp 0.4s ease ${i * 0.07}s both` }}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-black/[0.06] bg-slate-100 flex-shrink-0">
                            {prod.image && <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />}
                        </div>
                        <span className="text-slate-800 text-[13px] font-semibold">{prod.name}</span>
                    </div>
                    <div className="text-slate-500 text-xs flex items-center">{prod.category}</div>
                    <div className="text-yellow-500 text-[13px] font-bold flex items-center">${prod.price}</div>
                    <div className="flex items-center">
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                prod.stock < 5 ? "bg-red-400/10 text-red-400" : "bg-emerald-400/10 text-emerald-400"
            }`}>{prod.stock} left</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onEdit && onEdit(prod)}
                            className="bg-blue-400/10 border border-blue-400/20 text-blue-400 text-[11px] px-3 py-1.5 rounded-lg cursor-pointer font-semibold hover:bg-blue-400/20 transition-colors"
                        >Edit</button>
                        <button
                            onClick={() => onDelete && onDelete(prod.id)}
                            className="bg-red-400/10 border border-red-400/20 text-red-400 text-[11px] px-3 py-1.5 rounded-lg cursor-pointer font-semibold hover:bg-red-400/20 transition-colors"
                        >Del</button>
                    </div>
                </div>
            ))}
        </div>
    );
}