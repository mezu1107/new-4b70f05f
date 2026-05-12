import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const slots = ["10:00 AM","11:30 AM","2:00 PM","3:30 PM","5:00 PM"];

const nextWeek = () => {
  const days: { label: string; date: string }[] = [];
  const today = new Date();
  for (let i = 1; i <= 5; i++) {
    const d = new Date(today); d.setDate(today.getDate() + i);
    days.push({
      label: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
      date: d.toISOString().slice(0, 10),
    });
  }
  return days;
};

export const AppointmentWidget = () => {
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const days = nextWeek();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date) return toast.error("Pick a date");
    if (!slot) return toast.error("Pick a time slot");
    const f = new FormData(e.currentTarget);
    setBusy(true);
    const { error } = await supabase.from("appointments").insert({
      name: String(f.get("name") || ""),
      email: String(f.get("email") || ""),
      phone: String(f.get("phone") || "") || null,
      preferred_date: date,
      preferred_time: slot,
      service: "Free Strategy Call",
      message: String(f.get("message") || "") || null,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(`Booked for ${date} at ${slot}! We'll confirm by email.`);
    (e.currentTarget as HTMLFormElement).reset();
    setSlot(null); setDate(null);
  };

  return (
    <Card className="p-6 md:p-8 shadow-elegant glass-card">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg gradient-cta text-primary-foreground flex items-center justify-center"><Calendar className="w-5 h-5" /></div>
        <div>
          <h3 className="text-xl font-bold">Book a 30-min Strategy Call</h3>
          <p className="text-sm text-muted-foreground">Free · No obligation</p>
        </div>
      </div>

      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Pick a date</div>
      <div className="grid grid-cols-5 gap-2 mb-5">
        {days.map((d) => (
          <button key={d.date} type="button" onClick={() => setDate(d.date)}
            className={`px-2 py-2 rounded-lg text-[11px] md:text-xs font-medium border transition-smooth ${date === d.date ? "gradient-cta text-primary-foreground border-transparent shadow-glow" : "bg-card text-foreground border-border hover:border-primary"}`}>
            {d.label}
          </button>
        ))}
      </div>

      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Pick a time</div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5">
        {slots.map((s) => (
          <button key={s} type="button" onClick={() => setSlot(s)}
            className={`px-3 py-2 rounded-lg text-sm font-medium border transition-smooth flex items-center justify-center gap-1 ${slot === s ? "gradient-cta text-primary-foreground border-transparent shadow-glow" : "bg-card text-foreground border-border hover:border-primary"}`}>
            <Clock className="w-3.5 h-3.5" />{s}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="grid sm:grid-cols-2 gap-3">
        <Input name="name" placeholder="Your Name" required />
        <Input name="email" type="email" placeholder="Email" required />
        <Input name="phone" placeholder="Phone (optional)" className="sm:col-span-2" />
        <Button type="submit" disabled={busy} size="lg" className="gradient-cta text-primary-foreground shadow-glow sm:col-span-2">
          {busy ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Booking…</> : "Confirm Booking"}
        </Button>
      </form>
    </Card>
  );
};
