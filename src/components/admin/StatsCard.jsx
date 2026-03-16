import { useEffect, useState } from "react";

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);
  const target = parseFloat(value.replace(/[^0-9.]/g, ""));
  const prefix = value.includes("$") ? "$" : "";

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setDisplay(target);
        clearInterval(timer);
      } else setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, []);

  return (
    <span>
      {prefix}
      {display.toLocaleString()}
    </span>
  );
}

export default function StatsCard({ title, value, change, up, icon, sub, delay = 0 }) {
    return (
        <div
            className="bg-white border border-black/[0.07] rounded-2xl p-6 cursor-pointer transition-all duration-300 relative overflow-hidden shadow-sm hover:-translate-y-0.5 hover:shadow-md"
            style={{ animation: `fadeSlideUp 0.6s ease ${delay}s both` }}
        >
            <div className="absolute top-0 left-0 right-0 h-[2px]"
                 style={{ background: "linear-gradient(90deg, transparent, rgba(234,179,8,0.5), transparent)" }} />

            <div className="flex justify-between items-start mb-5">
                <div>
                    <div className="text-slate-400 text-[11px] tracking-[1.5px] mb-2.5 uppercase">{title}</div>
                    <div className="text-slate-900 text-[32px] font-extrabold tracking-tight">
                        <AnimatedNumber value={value} />
                    </div>
                </div>
                <div className="w-11 h-11 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-lg">
                    {icon}
                </div>
            </div>

            <div className="flex items-center gap-1.5">
        <span className={`text-[11px] font-bold px-2 py-1 rounded-md ${up ? "bg-emerald-500/10 text-emerald-500" : "bg-red-400/10 text-red-400"}`}>
          {change}
        </span>
                <span className="text-slate-400 text-[11px]">{sub}</span>
            </div>
        </div>
    );
}
