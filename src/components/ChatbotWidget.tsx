import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

interface Msg { role: "user" | "assistant"; content: string }

export const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [leadId, setLeadId] = useState<string | undefined>();
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi, I'm AM Enterprises. How may I help you?" },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // auto-scroll inside the chat container only
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  // click outside to close
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

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
      setMessages([...next, { role: "assistant", content: "Sorry, I had trouble. Please call 0317-3712950 or use the contact form." }]);
    } finally { setBusy(false); }
  };

  return (
    <div ref={panelRef}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Chat with AI"
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full gradient-primary text-white shadow-elegant flex items-center justify-center hover:scale-110 transition-smooth"
      >
        {open ? <X /> : <MessageCircle />}
      </button>

      {open && (
        <div
          className="fixed z-50 flex flex-col overflow-hidden rounded-2xl border border-white/40 bg-white/90 backdrop-blur-xl shadow-elegant
                     bottom-24 right-4 left-4 sm:left-auto
                     w-auto sm:w-[380px]
                     max-h-[calc(100dvh-7rem)] h-[min(520px,calc(100dvh-7rem))]"
        >
          <div className="gradient-primary text-white p-4 flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><Sparkles className="w-5 h-5" /></div>
            <div>
              <div className="font-bold">AM-Bot</div>
              <div className="text-xs opacity-90">Online · 24/7</div>
            </div>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3 bg-muted/20">
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
            <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Type a message…" disabled={busy} />
            <Button size="icon" variant="hero" onClick={send} disabled={busy}><Send className="w-4 h-4" /></Button>
          </div>
        </div>
      )}
    </div>
  );
};
