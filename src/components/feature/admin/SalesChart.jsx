import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const salesData = [
  { name: "Jan", revenue: 4200, orders: 34 },
  { name: "Feb", revenue: 7800, orders: 52 },
  { name: "Mar", revenue: 9800, orders: 71 },
  { name: "Apr", revenue: 11200, orders: 84 },
  { name: "May", revenue: 10500, orders: 76 },
  { name: "Jun", revenue: 13200, orders: 95 },
];

const tooltipClassName =
  "rounded-xl border border-black/[0.08] bg-white px-3 py-2 text-[11px] shadow-lg";

const chartCardClassName =
  "rounded-2xl border border-black/[0.07] bg-white p-5 shadow-sm";

export function AreaSalesChart() {
  return (
    <section className={chartCardClassName}>
      <div className="mb-4">
        <div className="mb-1 text-[10px] uppercase tracking-[2px] text-slate-400">
          Revenue
        </div>
        <h3 className="m-0 text-sm font-bold text-slate-900">Monthly Sales</h3>
      </div>

      <ResponsiveContainer width="100%" height={230}>
        <AreaChart data={salesData} margin={{ top: 0, right: 0, left: -10 }}>
          <defs>
            <linearGradient
              id="adminRevenueGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#eab308" stopOpacity={0.28} />
              <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 10 }}
          />
          <Tooltip
            contentStyle={{
              border: "none",
              boxShadow: "none",
              background: "transparent",
              padding: 0,
            }}
            formatter={(value) => `$${Number(value).toLocaleString()}`}
            labelFormatter={(label) => `${label}`}
            wrapperClassName={tooltipClassName}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#eab308"
            strokeWidth={2.5}
            fill="url(#adminRevenueGradient)"
            dot={{ fill: "#eab308", r: 3, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
}

export function BarOrdersChart() {
  return (
    <section className={chartCardClassName}>
      <div className="mb-4">
        <div className="mb-1 text-[10px] uppercase tracking-[2px] text-slate-400">
          Orders
        </div>
        <h3 className="m-0 text-sm font-bold text-slate-900">Order Volume</h3>
      </div>

      <ResponsiveContainer width="100%" height={230}>
        <BarChart data={salesData} margin={{ top: 0, right: 0, left: -10 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(0,0,0,0.05)"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 10 }}
          />
          <Tooltip
            contentStyle={{
              border: "none",
              boxShadow: "none",
              background: "transparent",
              padding: 0,
            }}
            formatter={(value) => Number(value).toLocaleString()}
            wrapperClassName={tooltipClassName}
          />
          <Bar dataKey="orders" fill="#60a5fa" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default function SalesChart() {
  return null;
}
