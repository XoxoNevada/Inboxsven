import { Check, CreditCard } from "lucide-react";

const plans = [
  { name: "Starter", price: "$0", features: ["100 messages/mo", "1 inbox", "Basic AI replies"], current: false },
  { name: "Pro", price: "$19", features: ["Unlimited messages", "5 inboxes", "Advanced AI", "Analytics"], current: true },
  { name: "Team", price: "$49", features: ["Everything in Pro", "Unlimited inboxes", "Team seats", "Priority support"], current: false },
];

export default function Billing() {
  return (
    <div className="min-h-full p-6 lg:p-10 space-y-8">
      <div>
        <h1 className="font-[var(--font-display)] text-2xl lg:text-3xl font-bold">Billing</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your plan and payment method.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
          <CreditCard size={22} />
        </div>
        <div className="flex-1">
          <p className="font-medium">Current plan: Pro</p>
          <p className="text-sm text-muted-foreground">Renews on the 1st of every month.</p>
        </div>
        <button className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/70 transition-colors">
          Manage
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-xl border p-5 space-y-4 ${p.current ? "border-primary bg-primary/5 glow-primary-sm" : "border-border bg-card"}`}
          >
            <div>
              <h3 className="font-semibold">{p.name}</h3>
              <p className="mt-1 text-2xl font-bold">{p.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
            </div>
            <ul className="space-y-2 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-muted-foreground">
                  <Check size={14} className="text-primary" /> {f}
                </li>
              ))}
            </ul>
            <button
              disabled={p.current}
              className="w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {p.current ? "Current Plan" : "Upgrade"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
