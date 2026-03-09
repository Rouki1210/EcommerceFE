import StatsCard from "../../components/admin/StatsCard";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

const data = [
    { month: "Jan", sales: 400 },
    { month: "Feb", sales: 900 },
    { month: "Mar", sales: 1200 },
    { month: "Apr", sales: 2000 }
];

export default function Dashboard() {

    return (
        <div className="space-y-6">

            <div className="grid grid-cols-3 gap-6">

                <StatsCard title="Revenue" value="$12,300" />
                <StatsCard title="Orders" value="230" />
                <StatsCard title="Users" value="1,200" />

            </div>

            <div className="bg-white p-6 rounded shadow">

                <h2 className="mb-4 font-bold">
                    Sales
                </h2>

                <LineChart width={600} height={300} data={data}>
                    <XAxis dataKey="month"/>
                    <YAxis/>
                    <Tooltip/>
                    <Line dataKey="sales"/>
                </LineChart>

            </div>

        </div>
    );
}