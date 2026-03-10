import { useState } from "react";
import { Instagram, Facebook, Send, Sparkles, Eye, Flag, Tag as TagIcon, Archive, ChevronLeft, PanelRightOpen, PanelRightClose } from "lucide-react";
import { cn } from "@/lib/utils";
import { conversations, tagColors, type Conversation, type Tag as TagType } from "@/data/mockData";

const filters: Array<{ label: string; value: string }> = [
  { label: "All", value: "all" },
  { label: "Unread", value: "unread" },
  { label: "Leads", value: "Lead" },
  { label: "Customers", value: "Customer" },
  { label: "Spam", value: "Spam" },
];

export default function Inbox() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Conversation>(conversations[0]);
  const [input, setInput] = useState("");
  const [showList, setShowList] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  const filtered = conversations.filter((c) => {
    if (filter === "all") return true;
    if (filter === "unread") return c.unread > 0;
    return c.tag === filter;
  });

  const PlatformIcon = ({ platform }: { platform: string }) =>
    platform === "instagram" ? <Instagram size={14} className="text-pink-400" /> : <Facebook size={14} className="text-blue-400" />;

  return (
    <div className="flex h-full">
      {/* Left – Conversation list */}
      <div className={cn("w-full md:w-80 flex-shrink-0 border-r border-border flex flex-col bg-card", !showList && "hidden md:flex")}>
        <div className="flex flex-wrap gap-1.5 p-3 border-b border-border">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                filter === f.value ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-secondary"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map((c) => (
            <button
              key={c.id}
              onClick={() => { setSelected(c); setShowList(false); }}
              className={cn(
                "flex w-full items-start gap-3 border-b border-border p-3 text-left transition-colors hover:bg-secondary/60",
                selected.id === c.id && "bg-secondary"
              )}
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                {c.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold truncate">{c.name}</span>
                  <PlatformIcon platform={c.platform} />
                  <span className={cn("ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-medium", tagColors[c.tag])}>{c.tag}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{c.preview}</p>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[10px] text-muted-foreground">{c.time}</span>
                  {c.unread > 0 && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{c.unread}</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Center – Chat */}
      <div className={cn("flex flex-1 flex-col min-w-0", showList && "hidden md:flex")}>
        {/* Chat header */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <button className="md:hidden text-muted-foreground" onClick={() => setShowList(true)}>
            <ChevronLeft size={20} />
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">{selected.avatar}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold">{selected.name}</span>
              <PlatformIcon platform={selected.platform} />
            </div>
            <span className="text-[11px] text-muted-foreground">Last active: {selected.lastActive}</span>
          </div>
          <button onClick={() => setShowProfile(!showProfile)} className="text-muted-foreground hover:text-foreground lg:hidden">
            {showProfile ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {selected.messages.map((m) => (
            <div key={m.id} className={cn("flex", m.fromUser ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[75%] rounded-2xl px-4 py-2.5 text-sm", m.fromUser ? "bg-primary text-primary-foreground rounded-br-md" : "bg-secondary text-foreground rounded-bl-md")}>
                <p>{m.text}</p>
                <span className="mt-1 block text-[10px] opacity-60">{m.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-border p-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a reply…"
            className="flex-1 rounded-lg bg-secondary px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring"
          />
          <button className="rounded-lg bg-primary px-3 py-2 text-primary-foreground hover:bg-accent transition-colors">
            <Send size={16} />
          </button>
          <button
            onClick={() => {
              if (selected.aiSuggestions.length > 0) setInput(selected.aiSuggestions[0]);
            }}
            className="flex items-center gap-1.5 rounded-lg border border-primary/40 px-3 py-2 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
          >
            <Sparkles size={14} /> AI Reply
          </button>
        </div>
      </div>

      {/* Right – Profile & AI */}
      <div className={cn(
        "w-72 flex-shrink-0 border-l border-border bg-card overflow-y-auto",
        "hidden lg:block",
        showProfile && "!block fixed inset-y-0 right-0 z-50 lg:static"
      )}>
        <div className="p-5 space-y-5">
          {/* Profile */}
          <div className="space-y-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">{selected.avatar}</div>
            <h3 className="font-semibold">{selected.name}</h3>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <PlatformIcon platform={selected.platform} />
              <span className="capitalize">{selected.platform}</span>
            </div>
            <p className="text-xs text-muted-foreground">Last active: {selected.lastActive}</p>
            <span className={cn("inline-block rounded-full px-2 py-0.5 text-[11px] font-medium", tagColors[selected.tag])}>{selected.tag}</span>
          </div>

          {/* Summary */}
          <div className="rounded-lg border border-border bg-secondary/50 p-3">
            <p className="text-xs font-medium text-muted-foreground mb-1">Conversation Summary</p>
            <p className="text-xs text-foreground">{selected.summary}</p>
          </div>

          {/* AI Suggestions */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1"><Sparkles size={12} /> AI Suggestions</p>
            <div className="space-y-2">
              {selected.aiSuggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setInput(s)}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-left text-xs text-foreground hover:border-primary/40 hover:bg-primary/5 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Quick Actions</p>
            {[
              { icon: Eye, label: "Mark as Read" },
              { icon: Flag, label: "Set Priority" },
              { icon: Tag, label: "Add Tag" },
              { icon: Archive, label: "Archive" },
            ].map(({ icon: Icon, label }) => (
              <button key={label} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
