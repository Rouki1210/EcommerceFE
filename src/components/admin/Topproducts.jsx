const topProducts = [
  { name: "Nike Air Max", sold: 142, revenue: "$17,040", trend: 12 },
  { name: "Adidas Ultra", sold: 98, revenue: "$11,760", trend: -3 },
  { name: "Puma RS-X", sold: 76, revenue: "$9,120", trend: 8 },
  { name: "New Balance", sold: 65, revenue: "$7,800", trend: 5 },
];

export default function Topproducts() {
  return (
    <div
      className="bg-white border border-black/[0.07] rounded-2xl p-6 shadow-sm"
      style={{ animation: "fadeSlideUp 0.6s ease 0.6s both" }}
    >
      <div className="mb-5">
        <div className="text-slate-400 text-[10px] tracking-[2px] mb-1 uppercase">
          Ranking
        </div>
        <h3 className="text-slate-900 text-base font-bold m-0">Top Products</h3>
      </div>

      <div className="flex flex-col gap-3.5">
        {topProducts.map((prod, i) => (
          <div
            key={prod.id}
            className="bg-black/[0.02] border border-black/[0.06] rounded-xl px-4 py-3.5"
            style={{
              animation: `fadeSlideUp 0.4s ease ${0.65 + i * 0.08}s both`,
            }}
          >
            <div className="flex justify-between items-center mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-yellow-400 text-[10px] font-black border border-yellow-400/25 bg-yellow-400/10">
                  #{i + 1}
                </div>
                <span className="text-slate-800 text-[13px] font-semibold">
                  {prod.name}
                </span>
              </div>
              <span
                className={`text-[10px] font-bold ${prod.trend > 0 ? "text-emerald-400" : "text-red-400"}`}
              >
                {prod.trend > 0 ? "↑" : "↓"} {Math.abs(prod.trend)}%
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-slate-500 text-[11px]">
                {prod.sold} sold
              </span>
              <span className="text-slate-500 text-[11px]">{prod.revenue}</span>
            </div>
            <div className="h-[3px] bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(prod.sold / 150) * 100}%`,
                  background: "linear-gradient(90deg, #eab308, #f59e0b)",
                  boxShadow: "0 0 8px rgba(234,179,8,0.4)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
