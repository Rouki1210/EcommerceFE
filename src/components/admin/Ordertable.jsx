const statusStyles = {
    Delivered:  "bg-emerald-400/15 text-emerald-400",
    Pending:    "bg-yellow-400/15 text-yellow-400",
    Processing: "bg-blue-400/15 text-blue-400",
    Cancelled:  "bg-red-400/15 text-red-400",
};
const statusDot = {
    Delivered: "bg-emerald-400",
    Pending:   "bg-yellow-400",
    Processing:"bg-blue-400",
    Cancelled: "bg-red-400",
};

const columns = ["Order ID", "Customer", "Product", "Amount", "Date", "Status"];

export default function OrderTable({ orders = [] }) {
    return (
        <div className="bg-white border border-black/[0.07] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1fr_1fr] px-6 py-4 border-b border-black/5 bg-slate-50">
                {columns.map(h => (
                    <div key={h} className="text-slate-700 text-[10px] tracking-[1.5px] font-semibold uppercase">{h}</div>
                ))}
            </div>

            {orders.map((order, i) => (
                <div
                    key={i}
                    className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1fr_1fr] px-6 py-3.5 border-b border-black/[0.04] hover:bg-slate-50 transition-colors cursor-pointer"
                    style={{ animation: `fadeSlideUp 0.4s ease ${i * 0.07}s both` }}
                >
                    <div className="text-yellow-500 text-xs font-semibold flex items-center">{order.id}</div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-yellow-400 text-[10px] font-bold border border-yellow-500/20"
                             style={{ background: "linear-gradient(135deg, #1e293b, #334155)" }}>
                            {order.avatar}
                        </div>
                        <span className="text-slate-800 text-xs font-medium">{order.customer}</span>
                    </div>
                    <div className="text-slate-500 text-xs flex items-center">{order.product}</div>
                    <div className="text-slate-800 text-xs font-semibold flex items-center">{order.amount}</div>
                    <div className="text-slate-500 text-[11px] flex items-center">{order.date}</div>
                    <div className="flex items-center">
            <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${statusStyles[order.status]}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusDot[order.status]}`} />
                {order.status}
            </span>
                    </div>
                </div>
            ))}
        </div>
    );
}