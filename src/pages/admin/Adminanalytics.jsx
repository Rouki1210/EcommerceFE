import Header from "../../components/feature/admin/Header";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { colors, shadows, keyframes } from "../../assets/theme/theme";

const monthlyData = [
  { month: "Jan", revenue: 4000, orders: 40, users: 80 },
  { month: "Feb", revenue: 9000, orders: 90, users: 120 },
  { month: "Mar", revenue: 12000, orders: 120, users: 160 },
  { month: "Apr", revenue: 20000, orders: 200, users: 210 },
  { month: "May", revenue: 16000, orders: 160, users: 190 },
  { month: "Jun", revenue: 24000, orders: 240, users: 260 },
];

const categoryData = [
  { name: "Sneakers", value: 40 },
  { name: "Running", value: 25 },
  { name: "Lifestyle", value: 20 },
  { name: "Classics", value: 15 },
];

const COLORS = ["#eab308", "#60a5fa", "#34d399", "#f87171"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-black/[0.08] rounded-xl px-4 py-3 shadow-lg">
        <p className="text-slate-400 text-[11px] mb-1.5">{label}</p>
        {payload.map((p, i) => (
          <p
            key={`${p.name}-${i}`}
            className="text-[13px] font-bold"
            style={{ color: p.color }}
          >
            {p.name}: {p.name === "revenue" ? "$" : ""}
            {p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const summaryStats = [
  {
    label: "Total Revenue",
    value: "$85,300",
    change: "+22%",
    up: true,
    icon: "💰",
  },
  {
    label: "Conversion Rate",
    value: "3.6%",
    change: "+0.4%",
    up: true,
    icon: "📈",
  },
  {
    label: "Avg Order Value",
    value: "$142",
    change: "-5%",
    up: false,
    icon: "🧾",
  },
  {
    label: "Return Rate",
    value: "2.1%",
    change: "-0.3%",
    up: true,
    icon: "🔄",
  },
];

export default function Adminanalytics() {
  return (
    <div className="flex flex-col gap-6 animate-[fadeSlideUp_0.5s_ease_both]">
      <Header title="Analytics" subtitle="Insights" />

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-4">
        {summaryStats.map((s, i) => (
          <div
            key={s.label}
            className="bg-white border border-black/[0.07] rounded-2xl p-6 shadow-sm relative overflow-hidden"
            style={{ animation: `fadeSlideUp 0.5s ease ${i * 0.08}s both` }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(234,179,8,0.5), transparent)",
              }}
            />
            <div className="flex justify-between items-start">
              <div>
                <div className="text-slate-400 text-[10px] tracking-[1.5px] mb-2 uppercase">
                  {s.label}
                </div>
                <div className="text-slate-900 text-2xl font-extrabold">
                  {s.value}
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-base">
                {s.icon}
              </div>
            </div>
            <span
              className={`inline-block mt-3 text-[11px] font-bold px-2 py-1 rounded-md ${s.up ? "bg-emerald-400/10 text-emerald-500" : "bg-red-400/10 text-red-400"}`}
            >
              {s.change}
            </span>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div
        className="bg-white border border-black/[0.07] rounded-2xl p-6 shadow-sm"
        style={{ animation: "fadeSlideUp 0.5s ease 0.3s both" }}
      >
        <div className="mb-5">
          <div className="text-slate-400 text-[10px] tracking-[2px] mb-1 uppercase">
            Trend
          </div>
          <h3 className="text-slate-900 text-base font-bold m-0">
            Revenue Overview
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart
            data={monthlyData}
            margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#eab308" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#eab308"
              strokeWidth={2.5}
              fill="url(#revGrad)"
              dot={{ fill: "#eab308", r: 3, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Orders + Category */}
      <div className="grid gap-5" style={{ gridTemplateColumns: "1.5fr 1fr" }}>
        <div
          className="bg-white border border-black/[0.07] rounded-2xl p-6 shadow-sm"
          style={{ animation: "fadeSlideUp 0.5s ease 0.35s both" }}
        >
          <div className="mb-5">
            <div className="text-slate-400 text-[10px] tracking-[2px] mb-1 uppercase">
              Comparison
            </div>
            <h3 className="text-slate-900 text-base font-bold m-0">
              Orders vs New Users
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={monthlyData}
              margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
              barSize={12}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(0,0,0,0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#94a3b8", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Bar dataKey="orders" fill="#eab308" radius={[4, 4, 0, 0]} />
              <Bar dataKey="users" fill="#60a5fa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          className="bg-white border border-black/[0.07] rounded-2xl p-6 shadow-sm"
          style={{ animation: "fadeSlideUp 0.5s ease 0.4s both" }}
        >
          <div className="mb-5">
            <div className="text-slate-400 text-[10px] tracking-[2px] mb-1 uppercase">
              Breakdown
            </div>
            <h3 className="text-slate-900 text-base font-bold m-0">
              Sales by Category
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                paddingAngle={4}
              >
                {categoryData.map((_, i) => (
                  <Cell key={`color-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2.5 mt-2">
            {categoryData.map((c, i) => (
              <div key={`legend-${i}`} className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-[2px]"
                  style={{ background: COLORS[i] }}
                />
                <span className="text-slate-500 text-[11px]">
                  {c.name} {c.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
