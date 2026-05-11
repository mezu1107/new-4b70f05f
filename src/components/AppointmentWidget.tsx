import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock } from "lucide-react";
import { toast } from "sonner";

const slots = ["10:00 AM","11:30 AM","2:00 PM","3:30 PM","5:00 PM"];

export const AppointmentWidget = () => {
  const [slot, setSlot] = useState<string | null>(null);
  return (
    <Card className="p-6 md:p-8 shadow-elegant bg-white">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg gradient-primary text-white flex items-center justify-center"><Calendar className="w-5 h-5" /></div>
        <div>
          <h3 className="text-xl">Book a 30-min Strategy Call</h3>
          <p className="text-sm text-muted-foreground">Free • No obligation</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5">
        {slots.map((s) => (
          <button key={s} onClick={() => setSlot(s)} className={`px-3 py-2 rounded-lg text-sm font-medium border transition-smooth flex items-center justify-center gap-1 ${slot === s ? "gradient-primary text-white border-transparent" : "bg-white text-foreground border-border hover:border-primary"}`}>
            <Clock className="w-3.5 h-3.5" />{s}
          </button>
        ))}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); if (!slot) return toast.error("Pick a time slot"); toast.success(`Booked for ${slot}!`); }} className="grid sm:grid-cols-2 gap-3">
        <Input placeholder="Your Name" required />
        <Input type="email" placeholder="Email" required />
        <Input placeholder="Phone" className="sm:col-span-2" />
        <Button type="submit" variant="hero" size="lg" className="sm:col-span-2">Confirm Booking</Button>
      </form>
    </Card>
  );
};
