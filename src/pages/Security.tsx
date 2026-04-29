import { Shield, Lock, Image as ImageIcon, Database, KeyRound, UserCheck, FileCheck2, AlertTriangle, ChevronDown, HelpCircle } from "lucide-react";

const sections = [
  {
    icon: Database,
    title: "Row-Level Security (RLS)",
    body: "Every table in our database is protected by Postgres Row-Level Security policies. These policies run on the server for every query and ensure that one user can never read or modify another user's data — even if a client-side check is bypassed. Your profile, settings, and account data are scoped to your authenticated user ID via auth.uid().",
  },
  {
    icon: ImageIcon,
    title: "Avatar & File Privacy",
    body: "Avatars are stored in an isolated storage bucket. Uploads, updates, and deletes are restricted by policy to the file owner — only you can change your own avatar. Files are addressed by your user ID path so other users cannot enumerate or list the bucket's contents.",
  },
  {
    icon: KeyRound,
    title: "Authentication & Passwords",
    body: "Authentication uses industry-standard JWT sessions with auto-refresh. Passwords are hashed server-side and checked against the HaveIBeenPwned breach database on signup and reset, blocking known-compromised credentials before they're ever used.",
  },
  {
    icon: UserCheck,
    title: "Server-Side Authorization",
    body: "Client-side route guards provide a smooth UX, but every sensitive action is re-validated on the server. Database functions run with locked-down search paths and explicit privilege grants, eliminating common SQL injection and privilege-escalation vectors.",
  },
  {
    icon: Lock,
    title: "Data in Transit & at Rest",
    body: "All traffic between your browser and our infrastructure is encrypted via TLS 1.2+. Database storage and backups are encrypted at rest using AES-256.",
  },
  {
    icon: FileCheck2,
    title: "Compliance Posture",
    body: "Our infrastructure provider is SOC 2 Type II certified and GDPR-aligned. We collect only the minimum data required to operate the service (email, name, optional avatar) and never sell user data to third parties.",
  },
];

const faqs = [
  {
    q: "What is Row-Level Security (RLS) and how does it protect me?",
    a: "RLS is a Postgres feature that filters every database query against per-user policies on the server. Even if someone crafted a malicious request, the database itself would refuse to return rows that don't belong to the authenticated user. Your profile, settings, and account records all enforce auth.uid() = id checks.",
  },
  {
    q: "Can other users see my avatar?",
    a: "Avatars live in a public-read bucket so they can render quickly in your dashboard, but the file path includes your user ID and is not enumerable — nobody can list the bucket to discover other users' images. Only you can upload, replace, or delete your own avatar.",
  },
  {
    q: "What happens if I upload a new avatar — is the old one kept?",
    a: "When you upload a new avatar, your profile is updated to point at the new file. Old avatar files are not surfaced in the app and are periodically cleaned up. If you want a previous avatar removed immediately, contact support.",
  },
  {
    q: "How long do you retain my data after I delete my account?",
    a: "On account deletion, your profile, avatar, and authentication record are removed from active systems within 30 days. Encrypted backups roll off within 90 days. We retain only what is legally required (e.g., billing records for tax compliance).",
  },
  {
    q: "Do you sell or share my data with third parties?",
    a: "No. We never sell user data. We share data only with infrastructure subprocessors (hosting, database, payment processing) strictly to operate the service, all under signed Data Processing Agreements.",
  },
  {
    q: "What data do you collect about my Instagram and Facebook messages?",
    a: "We process messages and comments through the official Meta APIs solely to deliver replies on your behalf. Conversation content is stored encrypted and is accessible only to your account and the human QC team assigned to it.",
  },
  {
    q: "Can I export or delete my data on request?",
    a: "Yes. Under GDPR and similar regulations, you can request a full export or permanent deletion of your data at any time by emailing contact@inboxsven.com. We respond within 30 days.",
  },
  {
    q: "Are passwords checked for breaches?",
    a: "Yes. New and reset passwords are checked against the HaveIBeenPwned database. If your password has appeared in a known breach, we block it and ask you to choose a different one.",
  },
];

export default function Security() {
  return (
    <div className="min-h-full p-6 lg:p-10 max-w-4xl space-y-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary ring-2 ring-primary/30 glow-primary-sm">
          <Shield size={24} />
        </div>
        <div>
          <h1 className="font-[var(--font-display)] text-2xl lg:text-3xl font-bold">Security & Compliance</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            How InboxSven protects your account, messages, and customer data.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-xl border border-border bg-card p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon size={18} />
              </div>
              <h2 className="text-sm font-semibold text-foreground">{title}</h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <HelpCircle size={18} />
          </div>
          <h2 className="font-[var(--font-display)] text-xl font-bold">Frequently Asked Questions</h2>
        </div>
        <div className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group">
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-foreground hover:bg-secondary/40 transition-colors list-none [&::-webkit-details-marker]:hidden">
                <span>{q}</span>
                <ChevronDown size={16} className="shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">{a}</div>
            </details>
          ))}
        </div>
      </section>

      <div className="rounded-xl border border-border bg-card p-5 flex gap-3">
        <AlertTriangle size={18} className="shrink-0 text-primary mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">Report a vulnerability</p>
          <p className="text-sm text-muted-foreground">
            Spotted a security issue? Email{" "}
            <a href="mailto:contact@inboxsven.com" className="text-primary hover:underline">
              contact@inboxsven.com
            </a>{" "}
            and we'll respond within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
