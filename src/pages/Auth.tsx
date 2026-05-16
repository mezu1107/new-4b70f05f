import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const schema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(6).max(72),
});

const Auth = () => {
  const nav = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) nav(isAdmin ? "/admin" : "/", { replace: true });
  }, [user, isAdmin, loading, nav]);

  const submit = async (mode: "signin" | "signup") => {
    const v = schema.safeParse({ email, password });
    if (!v.success) { toast.error(v.error.issues[0].message); return; }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
        if (error) throw error;
        toast.success("Account created. Check your email to verify, then sign in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
      }
    } catch (e: any) {
      toast.error(e.message || "Auth failed");
    } finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/40 to-white p-4">
      <Card className="w-full max-w-md p-8 shadow-elegant">
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary">← Back to site</Link>
        <div className="flex items-center gap-3 mt-4 mb-6">
          <img src={new URL("@/assets/logo.png", import.meta.url).href} alt="AM Enterprises" className="w-12 h-12 rounded-full object-cover" />
          <h1 className="text-2xl font-bold">Admin Access</h1>
        </div>
        <Tabs defaultValue="signin">
          <TabsList className="grid w-full grid-cols-2"><TabsTrigger value="signin">Sign In</TabsTrigger><TabsTrigger value="signup">Sign Up</TabsTrigger></TabsList>
          <TabsContent value="signin" className="space-y-3 mt-4">
            <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div><Label>Password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            <Button variant="hero" className="w-full" disabled={busy} onClick={() => submit("signin")}>Sign In</Button>
          </TabsContent>
          <TabsContent value="signup" className="space-y-3 mt-4">
            <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div><Label>Password (min 6)</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            <Button variant="hero" className="w-full" disabled={busy} onClick={() => submit("signup")}>Create Account</Button>
            <p className="text-xs text-muted-foreground">First user must be promoted to admin from the database (user_roles table) to access the admin panel.</p>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
export default Auth;
