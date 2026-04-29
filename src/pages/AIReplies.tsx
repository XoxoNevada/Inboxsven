import { Bot, Sparkles } from "lucide-react";

const templates = [
  { name: "Friendly greeting", preview: "Hi {name}! Thanks for reaching out — happy to help." },
  { name: "Pricing inquiry", preview: "Great question! Our plans start at $19/mo. Want me to send details?" },
  { name: "Out of office", preview: "Thanks for the message! We'll reply within 24 hours." },
];

export default function AIReplies() {
  return (
    <div className="min-h-full p-6 lg:p-10 space-y-8">
      <div>
        <h1 className="font-[var(--font-display)] text-2xl lg:text-3xl font-bold">AI Replies</h1>
        <p className="mt-1 text-sm text-muted-foreground">Smart suggestions tuned to your brand voice.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Bot size={22} />
        </div>
        <div>
          <p className="font-medium">AI Assistant is active</p>
          <p className="text-sm text-muted-foreground">Generating reply suggestions on every new message.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {templates.map((t) => (
          <div key={t.name} className="rounded-xl border border-border bg-card p-5 space-y-2">
            <div className="flex items-center gap-2 text-primary text-xs font-medium">
              <Sparkles size={14} /> Template
            </div>
            <h3 className="font-semibold">{t.name}</h3>
            <p className="text-sm text-muted-foreground">{t.preview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
