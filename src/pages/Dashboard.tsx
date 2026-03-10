import { MessageSquare, MailOpen, Clock, MessagesSquare } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { stats, chartData } from "@/data/mockData";

const iconMap: Record<string, React.ElementType> = { MessageSquare, MailOpen, Clock, MessagesSquare };

export default function Dashboard() {
  return (
    <div className="gradient-galaxy min-h-full p-6 lg:p-10 space-y-8">
      <div>
        <h1 className="font-[var(--font-display)] text-2xl lg:text-3xl font-bold">
          Your Unified Inbox – Ready to Manage IG & FB
        </h1>
        <p className="mt-1 text-muted-foreground text-sm">Welcome back. Here's what's happening today.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = iconMap[s.icon];
          return (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5 glow-primary-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <Icon size={18} className="text-primary" />
              </div>
              <p className="mt-2 text-2xl font-bold">{s.value}</p>
              <span className="text-xs text-emerald-400">{s.change} from last week</span>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-4 font-[var(--font-display)] text-sm font-semibold">Messages – Last 30 Days</h2>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(271 91% 65%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(271 91% 65%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, color: "var(--color-foreground)" }} />
            <Area type="monotone" dataKey="messages" stroke="hsl(271 91% 65%)" fill="url(#grad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
