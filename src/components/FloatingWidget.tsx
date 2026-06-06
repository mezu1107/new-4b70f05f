import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Phone, MoveDiagonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { cn } from "@/lib/utils";

interface Msg { role: "user" | "assistant"; content: string }

type Panel = null | "menu" | "chat" | "whatsapp";

const STORAGE_KEY = "am_fab_pos_v1";

export const FloatingWidget = () => {
  const { data: settings } = useSiteSettings();
  const wa = (settings?.whatsapp_number || "923173712950").replace(/\D/g, "");

  const [panel, setPanel] = useState<Panel>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef<{ ox: number; oy: number; sx: number; sy: number; moved: boolean } | null>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape
  useEffect(() => {
    if (!panel) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      if (fabRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      setPanel(null);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setPanel(null); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [panel]);

  // chat state
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [leadId, setLeadId] = useState<string | undefined>();
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi 👋 I'm AM-Bot — AM Enterprises ka official assistant. Aap ka business kese grow karwana chahain ge?" },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // load position
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setPos(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, panel]);

  // drag handlers
  const onPointerDown = (e: React.PointerEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
    const rect = target.getBoundingClientRect();
    dragRef.current = { ox: e.clientX - rect.left, oy: e.clientY - rect.top, sx: e.clientX, sy: e.clientY, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = Math.abs(e.clientX - dragRef.current.sx);
    const dy = Math.abs(e.clientY - dragRef.current.sy);
    if (!dragRef.current.moved && dx < 4 && dy < 4) return;
    dragRef.current.moved = true;
    setDragging(true);
    const x = Math.min(window.innerWidth - 64, Math.max(8, e.clientX - dragRef.current.ox));
    const y = Math.min(window.innerHeight - 64, Math.max(8, e.clientY - dragRef.current.oy));
    setPos({ x, y });
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const moved = dragRef.current?.moved;
    dragRef.current = null;
    setDragging(false);
    if (moved && pos) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(pos)); } catch {}
      return; // don't toggle on drag
    }
    setPanel((p) => (p ? null : "menu"));
  };

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next); setInput(""); setBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("chatbot", { body: { messages: next, leadId } });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      if (data?.leadId) setLeadId(data.leadId);
      setMessages([...next, { role: "assistant", content: data.message || "..." }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Sorry, network issue. Please call 0317-3712950 or message us on WhatsApp." }]);
    } finally { setBusy(false); }
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const fabStyle: React.CSSProperties = pos
    ? { left: pos.x, top: pos.y, right: "auto", bottom: "auto" }
    : { right: 16, bottom: isMobile ? 80 : 20 };

  return (
    <>
      {/* The FAB */}
      <button
        ref={fabRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        aria-label="Open quick contact"
        style={fabStyle}
        className={cn(
          "fixed z-50 w-14 h-14 rounded-full gradient-primary text-white shadow-elegant flex items-center justify-center select-none touch-none",
          dragging ? "cursor-grabbing scale-110" : "cursor-grab hover:scale-110 transition-smooth"
        )}
      >
        {panel ? <X /> : <MessageCircle />}
        <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">!</span>
      </button>

      {/* Menu (column) */}
      {panel === "menu" && (
        <div
          ref={panelRef}
          style={{
            ...(pos
              ? { left: Math.max(8, pos.x - 220), top: Math.max(8, pos.y - 180) }
              : { right: 20, bottom: 92 }),
          }}
          className="fixed z-50 w-[260px] rounded-2xl bg-white shadow-elegant border border-border overflow-hidden animate-in fade-in slide-in-from-bottom-2"
        >
          <div className="p-3 gradient-primary text-white text-sm font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Quick Contact
          </div>
          <button
            onClick={() => setPanel("chat")}
            className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 text-left transition-smooth border-b border-border"
          >
            <div className="w-10 h-10 rounded-full gradient-primary text-white flex items-center justify-center"><Sparkles className="w-5 h-5" /></div>
            <div>
              <div className="font-semibold text-sm">AM-Bot</div>
              <div className="text-xs text-muted-foreground">Hamara official AI chatbot</div>
            </div>
          </button>
          <a
            href={`https://wa.me/${wa}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 text-left transition-smooth border-b border-border"
          >
            <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center"><MessageCircle className="w-5 h-5" /></div>
            <div>
              <div className="font-semibold text-sm">WhatsApp Us</div>
              <div className="text-xs text-muted-foreground">Avg reply: under 10 min</div>
            </div>
          </a>
          <a href="tel:+923173712950" className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 text-left transition-smooth">
            <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center"><Phone className="w-5 h-5" /></div>
            <div>
              <div className="font-semibold text-sm">Call Now</div>
              <div className="text-xs text-muted-foreground">+92 317 3712950 · +44 7717 229638</div>
            </div>
          </a>
          <div className="px-4 py-2 text-[11px] text-muted-foreground bg-muted/40 flex items-center gap-1">
            <MoveDiagonal className="w-3 h-3" /> Tip: button ko drag kar ke kahin bhi le jayen
          </div>
        </div>
      )}

      {/* Chat panel */}
      {panel === "chat" && (
        <div
          ref={panelRef}
          style={{
            ...(pos
              ? { left: Math.max(8, Math.min(window.innerWidth - 388, pos.x - 200)), top: Math.max(8, pos.y - 480) }
              : { right: 16, bottom: 92 }),
          }}
          className="fixed z-50 flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-elegant w-[min(380px,calc(100vw-32px))] h-[min(520px,calc(100vh-7rem))]"
        >
          <div className="gradient-primary text-white p-4 flex items-center gap-3 shrink-0">
            <button onClick={() => setPanel("menu")} className="text-white/80 hover:text-white text-sm">←</button>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><Sparkles className="w-5 h-5" /></div>
            <div className="flex-1">
              <div className="font-bold">AM-Bot · Official Assistant</div>
              <div className="text-xs opacity-90 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400" /> Online · 24/7
              </div>
            </div>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 text-xs text-foreground">
              <div className="font-semibold text-primary mb-1">👋 Hello! Ye AM Enterprises ka official chatbot hai.</div>
              SEO, web dev, ads, ya kisi bhi service ke baare mein puchein — instant reply.
            </div>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm break-words ${m.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-white border border-border rounded-bl-sm"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {busy && <div className="text-xs text-muted-foreground">AM-Bot is typing…</div>}
          </div>
          <div className="p-3 border-t border-border flex gap-2 shrink-0 bg-white">
            <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Type your message…" disabled={busy} />
            <Button size="icon" variant="hero" onClick={send} disabled={busy}><Send className="w-4 h-4" /></Button>
          </div>
        </div>
      )}
    </>
  );
};
