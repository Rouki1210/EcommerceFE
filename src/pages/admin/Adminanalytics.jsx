import Header from "../../components/admin/Header";
import {
  FiDollarSign,
  FiTrendingUp,
  FiFileText,
  FiRefreshCw,
} from "react-icons/fi";
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

const COLORS = ["#c8a96e", "#60a5fa", "#34d399", "#f87171"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #e8e2db",
          borderRadius: 12,
          padding: "12px 16px",
          boxShadow: "0 4px 20px rgba(44,44,44,0.08)",
        }}
      >
        <p style={{ color: "#9a8c7e", fontSize: 11, marginBottom: 6 }}>
          {label}
        </p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, fontSize: 13, fontWeight: 700 }}>
            {p.name}: {p.name === "revenue" ? "$" : ""}
            {p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const card = {
  background: "#fff",
  border: "1px solid #e8e2db",
  borderRadius: 16,
  padding: "24px",
  boxShadow: "0 2px 12px rgba(44,44,44,0.05)",
};

export default function Adminanalytics() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        animation: "fadeSlideUp 0.5s ease both",
      }}
    >
      <Header title="Analytics" subtitle="Insights" />

      {/* Summary stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}
      >
        {[
          {
            label: "Total Revenue",
            value: "$85,300",
            change: "+22%",
            up: true,
            icon: <FiDollarSign size={16} />,
          },
          {
            label: "Conversion Rate",
            value: "3.6%",
            change: "+0.4%",
            up: true,
            icon: <FiTrendingUp size={16} />,
          },
          {
            label: "Avg Order Value",
            value: "$142",
            change: "-5%",
            up: false,
            icon: <FiFileText size={16} />,
          },
          {
            label: "Return Rate",
            value: "2.1%",
            change: "-0.3%",
            up: true,
            icon: <FiRefreshCw size={16} />,
          },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              ...card,
              position: "relative",
              overflow: "hidden",
              animation: `fadeSlideUp 0.5s ease ${i * 0.08}s both`,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background:
                  "linear-gradient(90deg, transparent, rgba(200,169,110,0.5), transparent)",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <div
                  style={{
                    color: "#9a8c7e",
                    fontSize: 10,
                    letterSpacing: 1.5,
                    marginBottom: 8,
                  }}
                >
                  {s.label.toUpperCase()}
                </div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#2c2c2c",
                    fontSize: 24,
                    fontWeight: 700,
                  }}
                >
                  {s.value}
                </div>
              </div>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "rgba(200,169,110,0.1)",
                  border: "1px solid rgba(200,169,110,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                {s.icon}
              </div>
            </div>
            <span
              style={{
                display: "inline-block",
                marginTop: 12,
                fontSize: 11,
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: 6,
                background: s.up
                  ? "rgba(52,211,153,0.12)"
                  : "rgba(248,113,113,0.12)",
                color: s.up ? "#10b981" : "#ef4444",
              }}
            >
              {s.change}
            </span>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div style={{ ...card, animation: "fadeSlideUp 0.5s ease 0.3s both" }}>
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              color: "#9a8c7e",
              fontSize: 10,
              letterSpacing: 2,
              marginBottom: 4,
            }}
          >
            TREND
          </div>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#2c2c2c",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
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
                <stop offset="5%" stopColor="#c8a96e" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#c8a96e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(44,44,44,0.06)" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#9a8c7e", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#9a8c7e", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#c8a96e"
              strokeWidth={2.5}
              fill="url(#revGrad)"
              dot={{ fill: "#c8a96e", r: 3, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Orders + Category */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20 }}
      >
        {/* Bar chart orders vs users */}
        <div style={{ ...card, animation: "fadeSlideUp 0.5s ease 0.35s both" }}>
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                color: "#9a8c7e",
                fontSize: 10,
                letterSpacing: 2,
                marginBottom: 4,
              }}
            >
              COMPARISON
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#2c2c2c",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
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
                stroke="rgba(44,44,44,0.06)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#9a8c7e", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#9a8c7e", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#9a8c7e" }} />
              <Bar dataKey="orders" fill="#c8a96e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="users" fill="#60a5fa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div style={{ ...card, animation: "fadeSlideUp 0.5s ease 0.4s both" }}>
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                color: "#9a8c7e",
                fontSize: 10,
                letterSpacing: 2,
                marginBottom: 4,
              }}
            >
              BREAKDOWN
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#2c2c2c",
                fontSize: 16,
                fontWeight: 600,
              }}
            >
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
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}
          >
            {categoryData.map((c, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    background: COLORS[i],
                  }}
                />
                <span style={{ color: "#9a8c7e", fontSize: 11 }}>
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
