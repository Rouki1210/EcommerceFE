import StatsCard from "../../components/admin/StatsCard";
import { AreaSalesChart, BarOrdersChart } from "../../components/admin/Saleschart";
import Recentorders from "../../components/admin/Recentorders";
import Topproducts from "../../components/admin/Topproducts";
import Header from "../../components/admin/Header";

const stats = [
    { title: "Total Revenue", value: "$12,300", change: "+18.2%", up: true,  icon: "💰", sub: "vs last month", delay: 0.15 },
    { title: "Total Orders",  value: "230",     change: "+7.4%",  up: true,  icon: "📦", sub: "vs last month", delay: 0.25 },
    { title: "Active Users",  value: "1,200",   change: "-2.1%",  up: false, icon: "👤", sub: "vs last month", delay: 0.35 },
];

export default function Admindashboard() {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <Header title="Admin Dashboard" subtitle="Overview" />

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                {stats.map((s, i) => <StatsCard key={i} {...s} />)}
            </div>

            {/* Charts */}
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20 }}>
                <AreaSalesChart />
                <BarOrdersChart />
            </div>

            {/* Bottom */}
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
                <Recentorders />
                <Topproducts />
            </div>
        </div>
    );
}