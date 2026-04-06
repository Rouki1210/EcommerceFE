import AdminCard from "./AdminCard";

const topProducts = [
  { name: "Aero Knit Sneakers", sold: 124, progress: 88 },
  { name: "Street Utility Jacket", sold: 97, progress: 71 },
  { name: "Cloud Runner V2", sold: 89, progress: 64 },
  { name: "Minimal Canvas Tote", sold: 58, progress: 43 },
];

export default function TopProducts() {
  return (
    <AdminCard title="Top Products" subtitle="Performance">
      <div className="space-y-3">
        {topProducts.map((product) => (
          <div
            key={product.name}
            className="rounded-xl border border-black/[0.06] p-3"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <div className="text-xs font-semibold text-slate-800">
                {product.name}
              </div>
              <div className="text-[11px] font-bold text-slate-500">
                {product.sold} sold
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500"
                style={{ width: `${product.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </AdminCard>
  );
}
