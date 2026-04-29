import { useState, useRef } from "react";
import { Upload, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export default function Settings() {
  const { user, profile } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(profile?.avatar_url ?? null);
  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [savedMsg, setSavedMsg] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setError("");
    setUploading(true);

    const ext = file.name.split(".").pop();
    const path = `${user.id}/avatar-${Date.now()}.${ext}`;

    const { error: uploadErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (uploadErr) {
      setError(uploadErr.message);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);
    const { error: updateErr } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", user.id);

    if (updateErr) setError(updateErr.message);
    else setAvatarUrl(publicUrl);
    setUploading(false);
  };

  const handleSaveName = async () => {
    if (!user) return;
    setSavedMsg("");
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName.trim() })
      .eq("id", user.id);
    if (error) setError(error.message);
    else setSavedMsg("Saved");
  };

  return (
    <div className="min-h-full p-6 lg:p-10 space-y-8 max-w-2xl">
      <div>
        <h1 className="font-[var(--font-display)] text-2xl lg:text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your profile</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        <div className="flex items-center gap-5">
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="h-20 w-20 rounded-full object-cover ring-2 ring-primary/30" />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-primary ring-2 ring-primary/30">
              <User size={32} />
            </div>
          )}
          <div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/70 transition-colors disabled:opacity-50"
            >
              <Upload size={14} />
              {uploading ? "Uploading…" : "Upload avatar"}
            </button>
            <p className="mt-2 text-xs text-muted-foreground">PNG or JPG, square works best.</p>
          </div>
        </div>

        {error && <div className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">{error}</div>}

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg bg-secondary px-4 py-2.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Email</label>
          <input
            value={user?.email ?? ""}
            disabled
            className="w-full rounded-lg bg-secondary px-4 py-2.5 text-sm text-muted-foreground outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveName}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-accent transition-colors"
          >
            Save changes
          </button>
          {savedMsg && <span className="text-xs text-primary">{savedMsg}</span>}
        </div>
      </div>
    </div>
  );
}
