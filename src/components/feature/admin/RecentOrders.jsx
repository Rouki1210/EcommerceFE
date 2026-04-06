import AdminCard from "./AdminCard";

const recentOrders = [
  {
    id: "#ORD-1034",
    customer: "Olivia Tran",
    amount: "$189",
    status: "Processing",
  },
  {
    id: "#ORD-1033",
    customer: "Kai Nguyen",
    amount: "$92",
    status: "Delivered",
  },
  {
    id: "#ORD-1032",
    customer: "Linh Do",
    amount: "$245",
    status: "Pending",
  },
  {
    id: "#ORD-1031",
    customer: "Noah Le",
    amount: "$61",
    status: "Cancelled",
  },
];

const statusBadge = {
  Delivered: "bg-emerald-400/10 text-emerald-500",
  Processing: "bg-blue-400/10 text-blue-500",
  Pending: "bg-yellow-400/10 text-yellow-600",
  Cancelled: "bg-red-400/10 text-red-500",
};

export default function RecentOrders() {
  return (
    <AdminCard
      title="Recent Orders"
      subtitle="Activity"
      actions={
        <button
          type="button"
          className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-3 py-1.5 text-[10px] font-bold text-yellow-700 transition-colors hover:bg-yellow-500/20"
        >
          View all
        </button>
      }
    >
      <div className="overflow-hidden rounded-xl border border-black/[0.06]">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-[1.1fr_1.4fr_0.8fr_0.9fr] items-center gap-2 border-b border-black/[0.05] px-4 py-3 last:border-b-0"
          >
            <div className="text-[11px] font-semibold text-slate-700">
              {order.id}
            </div>
            <div className="text-xs text-slate-600">{order.customer}</div>
            <div className="text-xs font-bold text-slate-900">
              {order.amount}
            </div>
            <div>
              <span
                className={`rounded-md px-2 py-1 text-[10px] font-semibold ${statusBadge[order.status]}`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </AdminCard>
  );
}
