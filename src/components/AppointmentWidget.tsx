import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Loader2, Check, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import { cn } from "@/lib/utils";

const SLOTS = ["09:30 AM", "11:00 AM", "12:30 PM", "02:00 PM", "03:30 PM", "05:00 PM"];

export const AppointmentWidget = () => {
  const { data: services } = useRealtimeTable<any>({ table: "services", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" } });
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const [service, setService] = useState<string>("Free Strategy Call");
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", budget: "", message: "" });

  const days = useMemo(() => {
    const out: { label: string; sub: string; date: string }[] = [];
    const today = new Date();
    for (let i = 1; i <= 10; i++) {
      const d = new Date(today); d.setDate(today.getDate() + i);
      if (d.getDay() === 0) continue; // skip Sundays
      out.push({
        label: d.toLocaleDateString("en-US", { weekday: "short" }),
        sub: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        date: d.toISOString().slice(0, 10),
      });
    }
    return out.slice(0, 8);
  }, []);

  const next = () => {
    if (step === 1 && !service) return toast.error("Select a service");
    if (step === 2 && (!date || !slot)) return toast.error("Pick date and time");
    if (step === 3 && (!form.name || !form.email)) return toast.error("Name and email required");
    setStep((s) => s + 1);
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = async () => {
    setBusy(true);
    const { error } = await supabase.from("appointments").insert({
      name: form.name, email: form.email, phone: form.phone || null,
      company: form.company || null, budget: form.budget || null,
      service, preferred_date: date, preferred_time: slot,
      duration_minutes: 30, message: form.message || null,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    setDone(true);
    setStep(4);
  };

  if (done) {
    return (
      <Card className="p-8 shadow-elegant glass-card text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/15 text-green-500 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Booking Confirmed</h3>
        <p className="text-muted-foreground mb-1"><span className="font-semibold text-foreground">{service}</span></p>
        <p className="text-muted-foreground mb-4">{date} · {slot}</p>
        <p className="text-sm text-muted-foreground">We've sent a confirmation to <span className="font-semibold">{form.email}</span>. Our team will reach out within 1 business hour.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:p-8 shadow-elegant glass-card">
      {/* header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg gradient-cta text-primary-foreground flex items-center justify-center"><Calendar className="w-5 h-5" /></div>
        <div className="flex-1">
          <h3 className="text-xl font-bold">Book Your Strategy Session</h3>
          <p className="text-sm text-muted-foreground">Free 30-min · No obligation · Avg reply &lt; 1 hr</p>
        </div>
      </div>

      {/* progress */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex-1">
            <div className={cn("h-1.5 rounded-full", step >= n ? "bg-primary" : "bg-border")} />
            <div className="text-[10px] uppercase tracking-wider mt-1.5 text-muted-foreground">
              {n === 1 ? "Service" : n === 2 ? "Date & Time" : "Details"}
            </div>
          </div>
        ))}
      </div>

      {/* Step 1: Service */}
      {step === 1 && (
        <div className="space-y-2">
          <button type="button" onClick={() => setService("Free Strategy Call")}
            className={cn("w-full text-left p-4 rounded-xl border transition-smooth flex items-start gap-3",
              service === "Free Strategy Call" ? "border-primary bg-primary/5 shadow-glow" : "border-border hover:border-primary/50")}>
            <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold">Free Strategy Call</div>
              <div className="text-xs text-muted-foreground">30 min · audit + roadmap</div>
            </div>
          </button>
          {(services || []).slice(0, 6).map((s: any) => (
            <button key={s.id} type="button" onClick={() => setService(s.title)}
              className={cn("w-full text-left p-4 rounded-xl border transition-smooth",
                service === s.title ? "border-primary bg-primary/5 shadow-glow" : "border-border hover:border-primary/50")}>
              <div className="font-semibold">{s.title}</div>
              {s.description && <div className="text-xs text-muted-foreground line-clamp-1">{s.description}</div>}
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Date & Time */}
      {step === 2 && (
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Pick a date</div>
          <div className="grid grid-cols-4 gap-2 mb-5">
            {days.map((d) => (
              <button key={d.date} type="button" onClick={() => setDate(d.date)}
                className={cn("px-2 py-3 rounded-lg text-center border transition-smooth",
                  date === d.date ? "gradient-cta text-primary-foreground border-transparent shadow-glow" : "bg-card hover:border-primary")}>
                <div className="text-[10px] uppercase tracking-wider opacity-70">{d.label}</div>
                <div className="text-sm font-bold">{d.sub}</div>
              </button>
            ))}
          </div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Pick a time</div>
          <div className="grid grid-cols-3 gap-2">
            {SLOTS.map((s) => (
              <button key={s} type="button" onClick={() => setSlot(s)}
                className={cn("px-3 py-2.5 rounded-lg text-sm font-medium border transition-smooth flex items-center justify-center gap-1",
                  slot === s ? "gradient-cta text-primary-foreground border-transparent shadow-glow" : "bg-card hover:border-primary")}>
                <Clock className="w-3.5 h-3.5" />{s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Details */}
      {step === 3 && (
        <div className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <div><Label>Full Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Email *</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div><Label>Phone / WhatsApp</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
            <div><Label>Company</Label><Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
          </div>
          <div>
            <Label>Monthly Marketing Budget</Label>
            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
              <option value="">Select…</option>
              <option>Under $1,000</option><option>$1,000 – $5,000</option><option>$5,000 – $20,000</option><option>$20,000+</option>
            </select>
          </div>
          <div><Label>What would you like to discuss?</Label><Textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
        </div>
      )}

      {/* Nav buttons */}
      <div className="flex gap-2 mt-6">
        {step > 1 && <Button variant="outline" onClick={back}><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>}
        {step < 3 && <Button className="flex-1 gradient-cta text-primary-foreground shadow-glow" onClick={next}>Continue <ArrowRight className="w-4 h-4 ml-1" /></Button>}
        {step === 3 && <Button className="flex-1 gradient-cta text-primary-foreground shadow-glow" onClick={submit} disabled={busy}>
          {busy ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Booking…</> : "Confirm Booking"}
        </Button>}
      </div>
    </Card>
  );
};
