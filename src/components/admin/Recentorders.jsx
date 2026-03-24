import { useNavigate } from "react-router-dom";

const recentOrders = [
  {
    id: "#ORD-8821",
    customer: "Nguyen Van A",
    product: "Nike Air Max",
    amount: "$240",
    status: "Delivered",
    avatar: "N",
  },
  {
    id: "#ORD-8820",
    customer: "Tran Thi B",
    product: "Adidas Ultra",
    amount: "$180",
    status: "Pending",
    avatar: "T",
  },
  {
    id: "#ORD-8819",
    customer: "Le Van C",
    product: "Puma RS-X",
    amount: "$150",
    status: "Processing",
    avatar: "L",
  },
  {
    id: "#ORD-8818",
    customer: "Pham Thi D",
    product: "New Balance",
    amount: "$210",
    status: "Delivered",
    avatar: "P",
  },
  {
    id: "#ORD-8817",
    customer: "Hoang Van E",
    product: "Converse All",
    amount: "$90",
    status: "Cancelled",
    avatar: "H",
  },
];

const statusStyle = {
  Delivered: "bg-emerald-400/15 text-emerald-400",
  Pending: "bg-yellow-400/15 text-yellow-400",
  Processing: "bg-blue-400/15 text-blue-400",
  Cancelled: "bg-red-400/15 text-red-400",
};
const statusDot = {
  Delivered: "bg-emerald-400",
  Pending: "bg-yellow-400",
  Processing: "bg-blue-400",
  Cancelled: "bg-red-400",
};

export default function Recentorders() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white border border-black/[0.07] rounded-2xl p-6 shadow-sm"
      style={{ animation: "fadeSlideUp 0.6s ease 0.55s both" }}
    >
      <div className="flex justify-between items-center mb-5">
        <div>
          <div className="text-slate-400 text-[10px] tracking-[2px] mb-1 uppercase">
            Latest
          </div>
          <h3 className="text-slate-900 text-base font-bold m-0">
            Recent Orders
          </h3>
        </div>
        <button
          onClick={() => navigate("/admin/orders")}
          className="bg-yellow-500/10 border border-yellow-500/25 text-yellow-600 text-[11px] px-3.5 py-1.5 rounded-lg cursor-pointer font-semibold hover:bg-yellow-500/20 transition-all"
        >
          View All →
        </button>
      </div>

      {/* Header */}
      <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr] px-2 pb-2.5 border-b border-black/[0.06]">
        {["Customer", "Product", "Amount", "Status"].map((h) => (
          <div
            key={h}
            className="text-slate-400 text-[10px] tracking-[1.5px] font-semibold uppercase"
          >
            {h}
          </div>
        ))}
      </div>

      {recentOrders.map((order, i) => (
        <div
          key={order.id}
          onClick={() => navigate("/admin/orders")}
          className="grid grid-cols-[2fr_1.5fr_1fr_1fr] px-2 py-3 border-b border-black/[0.04] cursor-pointer rounded-lg hover:bg-slate-50 transition-colors"
          style={{ animation: `fadeSlideUp 0.4s ease ${0.6 + i * 0.07}s both` }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-yellow-500 text-[11px] font-bold border border-yellow-500/25 bg-slate-50">
              {order.avatar}
            </div>
            <div>
              <div className="text-slate-800 text-xs font-semibold">
                {order.customer}
              </div>
              <div className="text-slate-400 text-[10px]">{order.id}</div>
            </div>
          </div>
          <div className="text-slate-500 text-xs flex items-center">
            {order.product}
          </div>
          <div className="text-slate-800 text-xs font-semibold flex items-center">
            {order.amount}
          </div>
          <div className="flex items-center">
            <span
              className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${statusStyle[order.status]}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${statusDot[order.status]}`}
              />
              {order.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
