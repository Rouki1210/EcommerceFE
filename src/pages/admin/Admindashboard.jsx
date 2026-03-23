import StatsCard from "../../components/admin/StatsCard";
import {
  AreaSalesChart,
  BarOrdersChart,
} from "../../components/admin/Saleschart";
import Recentorders from "../../components/admin/Recentorders";
import Topproducts from "../../components/admin/Topproducts";
import Header from "../../components/admin/Header";
import { colors, shadows, keyframes } from "../../assets/theme/theme";

const stats = [
  {
    title: "Total Revenue",
    value: "$12,300",
    change: "+18.2%",
    up: true,
    icon: "💰",
    sub: "vs last month",
    delay: 0.15,
  },
  {
    title: "Total Orders",
    value: "230",
    change: "+7.4%",
    up: true,
    icon: "📦",
    sub: "vs last month",
    delay: 0.25,
  },
  {
    title: "Active Users",
    value: "1,200",
    change: "-2.1%",
    up: false,
    icon: "👤",
    sub: "vs last month",
    delay: 0.35,
  },
];

export default function Admindashboard() {
  return (
    <div className="flex flex-col gap-7">
      <Header title="Admin Dashboard" subtitle="Overview" />

      <div className="grid grid-cols-3 gap-5">
        {stats.map((s, i) => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid gap-5" style={{ gridTemplateColumns: "1.6fr 1fr" }}>
        <AreaSalesChart />
        <BarOrdersChart />
      </div>

      <div className="grid gap-5" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
        <Recentorders />
        <Topproducts />
      </div>
    </div>
  );
}
