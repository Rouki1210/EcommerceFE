import {
    ResponsiveContainer, AreaChart, Area,
    XAxis, YAxis, Tooltip, CartesianGrid,
    BarChart, Bar,
} from "recharts";

const salesData = [
    { month: "Jan", sales: 400,  profit: 240  },
    { month: "Feb", sales: 900,  profit: 580  },
    { month: "Mar", sales: 1200, profit: 820  },
    { month: "Apr", sales: 2000, profit: 1400 },
    { month: "May", sales: 1600, profit: 1100 },
    { month: "Jun", sales: 2400, profit: 1800 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[rgba(15,15,25,0.95)] border border-yellow-400/30 rounded-xl px-4 py-3 backdrop-blur-md">
                <p className="text-slate-400 text-[11px] mb-1.5">{label}</p>
                {payload.map((p, i) => (
                    <p key={i} className="text-[13px] font-bold" style={{ color: p.color }}>
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
        <div className="bg-white border border-black/[0.07] rounded-2xl px-5 py-6 shadow-sm" style={{ animation: "fadeSlideUp 0.6s ease 0.45s both" }}>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <div className="text-slate-400 text-[10px] tracking-[2px] mb-1 uppercase">Performance</div>
                    <h3 className="text-slate-900 text-base font-bold m-0">Sales & Profit</h3>
                </div>
                <div className="flex gap-4">
                    {[{ label: "Sales", color: "#eab308" }, { label: "Profit", color: "#60a5fa" }].map(l => (
                        <div key={l.label} className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-[2px]" style={{ background: l.color }} />
                            <span className="text-slate-500 text-[11px]">{l.label}</span>
                        </div>
                    ))}
                </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={salesData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor="#eab308" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor="#60a5fa" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="month" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="sales"  stroke="#eab308" strokeWidth={2.5} fill="url(#salesGrad)"  dot={{ fill: "#eab308", strokeWidth: 0, r: 3 }} />
                    <Area type="monotone" dataKey="profit" stroke="#60a5fa" strokeWidth={2.5} fill="url(#profitGrad)" dot={{ fill: "#60a5fa", strokeWidth: 0, r: 3 }} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export function BarOrdersChart() {
    return (
        <div className="bg-white border border-black/[0.07] rounded-2xl px-5 py-6 shadow-sm" style={{ animation: "fadeSlideUp 0.6s ease 0.5s both" }}>
            <div className="mb-6">
                <div className="text-slate-400 text-[10px] tracking-[2px] mb-1 uppercase">Monthly</div>
                <h3 className="text-slate-900 text-base font-bold m-0">Orders Volume</h3>
            </div>
            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={salesData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={16}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="sales" fill="rgba(234,179,8,0.7)" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}