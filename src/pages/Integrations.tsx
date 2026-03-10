import { useState } from "react";
import { Instagram, Facebook, X, Check, ExternalLink, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  connected: boolean;
}

export default function Integrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    { id: "ig", name: "Instagram Graph API", description: "Pull DMs and comments from your Instagram Business account.", icon: Instagram, iconColor: "text-pink-400", connected: false },
    { id: "fb", name: "Facebook Messenger API", description: "Receive and reply to Messenger conversations from your Facebook Page.", icon: Facebook, iconColor: "text-blue-400", connected: false },
  ]);
  const [modal, setModal] = useState<string | null>(null);

  const handleConnect = (id: string) => {
    setModal(id);
    setTimeout(() => {
      setIntegrations((prev) => prev.map((i) => (i.id === id ? { ...i, connected: true } : i)));
      setModal(null);
    }, 2000);
  };

  const handleDisconnect = (id: string) => {
    setIntegrations((prev) => prev.map((i) => (i.id === id ? { ...i, connected: false } : i)));
  };

  return (
    <div className="gradient-galaxy min-h-full p-6 lg:p-10 space-y-8">
      <div>
        <h1 className="font-[var(--font-display)] text-2xl lg:text-3xl font-bold">Integrations</h1>
        <p className="mt-1 text-muted-foreground text-sm">Connect your business accounts to pull in messages automatically.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {integrations.map((intg) => (
          <div key={intg.id} className="rounded-xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg bg-secondary", intg.iconColor)}>
                <intg.icon size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{intg.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{intg.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={cn("flex items-center gap-1.5 text-xs font-medium", intg.connected ? "text-emerald-400" : "text-muted-foreground")}>
                {intg.connected ? <><Check size={14} /> Connected</> : "Not Connected"}
              </span>
              {intg.connected ? (
                <button onClick={() => handleDisconnect(intg.id)} className="rounded-lg border border-destructive/40 px-4 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors">
                  Disconnect
                </button>
              ) : (
                <button onClick={() => handleConnect(intg.id)} className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-accent transition-colors">
                  <ExternalLink size={13} /> Connect Account
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2 rounded-lg border border-border bg-secondary/50 p-4 text-xs text-muted-foreground">
        <Info size={16} className="flex-shrink-0 mt-0.5 text-primary" />
        <p>Need to configure API keys or webhooks? Head to <span className="text-primary font-medium cursor-pointer">Settings</span> to manage advanced integration options.</p>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="rounded-xl border border-border bg-card p-8 text-center space-y-3 max-w-sm mx-4">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm font-medium">Connecting via Meta…</p>
            <p className="text-xs text-muted-foreground">Please wait while we authorize your account.</p>
          </div>
        </div>
      )}
    </div>
  );
}
