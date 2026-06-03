import { useEffect, useState } from "react";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { REGIONS, SUPPORTED_REGION_CODES, getRegion } from "@/data/regions";
import { setGeoOverride, getGeoOverride, useGeo } from "@/hooks/useGeo";

export const CountrySwitcher = ({ compact = false }: { compact?: boolean }) => {
  const geo = useGeo();
  const [active, setActive] = useState<string>("US");
  const navigate = useNavigate();

  useEffect(() => {
    const override = getGeoOverride();
    if (override) setActive(override);
    else if (geo.country && SUPPORTED_REGION_CODES.includes(geo.country)) setActive(geo.country);
  }, [geo.country]);

  const handlePick = (code: string) => {
    setGeoOverride(code);
    setActive(code);
    const r = getRegion(code);
    navigate(`/${r.code.toLowerCase()}`);
  };

  const current = getRegion(active);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={compact ? "sm" : "default"} className="gap-2">
          <span className="text-lg leading-none">{current.flag}</span>
          {!compact && <span className="font-medium">{current.code}</span>}
          <Globe className="w-3.5 h-3.5 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-background z-50">
        {SUPPORTED_REGION_CODES.map((code) => {
          const r = REGIONS[code];
          return (
            <DropdownMenuItem key={code} onClick={() => handlePick(code)} className="cursor-pointer">
              <span className="text-lg mr-2">{r.flag}</span>
              <span className="flex-1">{r.name}</span>
              <span className="text-xs text-muted-foreground mr-2">{r.currency}</span>
              {active === code && <Check className="w-4 h-4 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
