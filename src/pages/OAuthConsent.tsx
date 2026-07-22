import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck, XCircle } from "lucide-react";

// Typed shim for the beta supabase.auth.oauth namespace.
type OAuthResult = { data: any; error: { message: string } | null };
type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<OAuthResult>;
  approveAuthorization: (id: string) => Promise<OAuthResult>;
  denyAuthorization: (id: string) => Promise<OAuthResult>;
};
const oauth = ((supabase.auth as unknown as { oauth: OAuthApi }).oauth);

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) { setError("Missing authorization_id."); return; }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/auth?next=" + encodeURIComponent(next);
        return;
      }
      setEmail(sess.session.user.email ?? null);
      try {
        const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
        if (!active) return;
        if (error) { setError(error.message); return; }
        const immediate = data?.redirect_url ?? data?.redirect_to;
        if (immediate && !data?.client) { window.location.href = immediate; return; }
        setDetails(data);
      } catch (e: any) {
        if (active) setError(e?.message ?? "Failed to load authorization request.");
      }
    })();
    return () => { active = false; };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    try {
      const { data, error } = approve
        ? await oauth.approveAuthorization(authorizationId)
        : await oauth.denyAuthorization(authorizationId);
      if (error) { setError(error.message); setBusy(false); return; }
      const target = data?.redirect_url ?? data?.redirect_to;
      if (!target) { setError("No redirect returned by the authorization server."); setBusy(false); return; }
      window.location.href = target;
    } catch (e: any) {
      setError(e?.message ?? "Authorization decision failed.");
      setBusy(false);
    }
  }

  if (error) {
    return (
      <Wrap>
        <div className="flex items-center gap-2 text-destructive mb-2"><XCircle className="w-5 h-5" /><h1 className="text-xl font-bold">Authorization error</h1></div>
        <p className="text-sm text-muted-foreground mb-4">{error}</p>
        <Link to="/" className="text-sm text-primary underline">Return to site</Link>
      </Wrap>
    );
  }
  if (!details) {
    return <Wrap><div className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Loading authorization request…</div></Wrap>;
  }

  const clientName = details.client?.client_name ?? details.client?.name ?? "an application";
  const redirectUri: string | undefined = details.client?.redirect_uris?.[0] ?? details.redirect_uri;
  const scopes: string[] = (details.scope ?? details.scopes ?? "").toString().split(/\s+/).filter(Boolean);

  return (
    <Wrap>
      <div className="flex items-center gap-2 mb-3"><ShieldCheck className="w-6 h-6 text-primary" /><h1 className="text-2xl font-bold">Connect {clientName} to AM Enterprises</h1></div>
      <p className="text-sm text-muted-foreground mb-4">
        This lets <span className="font-semibold">{clientName}</span> use AM Enterprises as you{email ? <> (<span className="font-mono">{email}</span>)</> : null}. This does not bypass this app's permissions or backend policies.
      </p>
      {redirectUri && (
        <div className="text-xs text-muted-foreground mb-4">
          Redirects to: <span className="font-mono break-all">{redirectUri}</span>
        </div>
      )}
      {scopes.length > 0 && (
        <ul className="text-sm mb-6 list-disc pl-5 space-y-1">
          {scopes.map((s) => (
            <li key={s}>
              {s === "openid" || s === "profile" ? "Share your basic profile"
                : s === "email" ? "Share your email address"
                : <>Additional permission requested: <span className="font-mono">{s}</span></>}
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-3">
        <Button variant="hero" disabled={busy} onClick={() => decide(true)}>{busy ? "Working…" : "Approve"}</Button>
        <Button variant="outline" disabled={busy} onClick={() => decide(false)}>Cancel connection</Button>
      </div>
    </Wrap>
  );
}

function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-secondary/40 to-white">
      <Card className="w-full max-w-lg p-8 shadow-elegant">{children}</Card>
    </div>
  );
}
