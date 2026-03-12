import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 400, profit: 240 },
  { month: "Feb", sales: 900, profit: 580 },
  { month: "Mar", sales: 1200, profit: 820 },
  { month: "Apr", sales: 2000, profit: 1400 },
  { month: "May", sales: 1600, profit: 1100 },
  { month: "Jun", sales: 2400, profit: 1800 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "rgba(44,44,44,0.95)",
          border: "1px solid rgba(200,169,110,0.3)",
          borderRadius: 12,
          padding: "12px 16px",
          backdropFilter: "blur(10px)",
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 11,
            marginBottom: 6,
          }}
        >
          {label}
        </p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, fontSize: 13, fontWeight: 700 }}>
            {p.name}: ${p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function AreaSalesChart() {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e8e2db",
        borderRadius: 16,
        padding: "24px 20px",
        animation: "fadeSlideUp 0.6s ease 0.45s both",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <div
            style={{
              color: "#9a8c7e",
              fontSize: 10,
              letterSpacing: 2,
              marginBottom: 4,
            }}
          >
            PERFORMANCE
          </div>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#2c2c2c",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Sales & Profit
          </h3>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {[
            { label: "Sales", color: "#c8a96e" },
            { label: "Profit", color: "#60a5fa" },
          ].map((l) => (
            <div
              key={l.label}
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  background: l.color,
                }}
              />
              <span style={{ color: "#9a8c7e", fontSize: 11 }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={salesData}
          margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c8a96e" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#c8a96e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(44,44,44,0.07)" />
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
            dataKey="sales"
            stroke="#c8a96e"
            strokeWidth={2.5}
            fill="url(#salesGrad)"
            dot={{ fill: "#c8a96e", strokeWidth: 0, r: 3 }}
          />
          <Area
            type="monotone"
            dataKey="profit"
            stroke="#60a5fa"
            strokeWidth={2.5}
            fill="url(#profitGrad)"
            dot={{ fill: "#60a5fa", strokeWidth: 0, r: 3 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BarOrdersChart() {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e8e2db",
        borderRadius: 16,
        padding: "24px 20px",
        animation: "fadeSlideUp 0.6s ease 0.5s both",
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            color: "#9a8c7e",
            fontSize: 10,
            letterSpacing: 2,
            marginBottom: 4,
          }}
        >
          MONTHLY
        </div>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#2c2c2c",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          Orders Volume
        </h3>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={salesData}
          margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          barSize={16}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(44,44,44,0.07)"
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
          <Bar
            dataKey="sales"
            fill="rgba(200,169,110,0.75)"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
