import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp } from "lucide-react";

export const ROICalculator = () => {
  const [visitors, setVisitors] = useState(5000);
  const [conversion, setConversion] = useState(2);
  const [orderValue, setOrderValue] = useState(50);
  const projected = Math.round((visitors * 2.5) * ((conversion + 2) / 100) * orderValue);
  const current = Math.round(visitors * (conversion / 100) * orderValue);
  const lift = projected - current;
  return (
    <Card className="p-6 md:p-8 shadow-elegant bg-white">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg gradient-primary text-white flex items-center justify-center"><TrendingUp className="w-5 h-5" /></div>
        <h3 className="text-2xl">ROI Calculator</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div><Label>Monthly Visitors</Label><Input type="number" value={visitors} onChange={(e) => setVisitors(+e.target.value || 0)} /></div>
          <div><Label>Conversion Rate (%)</Label><Input type="number" value={conversion} onChange={(e) => setConversion(+e.target.value || 0)} /></div>
          <div><Label>Avg Order Value (USD)</Label><Input type="number" value={orderValue} onChange={(e) => setOrderValue(+e.target.value || 0)} /></div>
        </div>
        <div className="bg-secondary rounded-xl p-6 flex flex-col justify-center">
          <div className="text-sm text-muted-foreground">Current Monthly Revenue</div>
          <div className="text-2xl font-bold text-foreground mb-4">${current.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">With AM Enterprises</div>
          <div className="text-3xl font-extrabold text-gradient mb-2">${projected.toLocaleString()}</div>
          <div className="text-sm font-semibold text-accent">+ ${lift.toLocaleString()} lift / month</div>
        </div>
      </div>
    </Card>
  );
};
