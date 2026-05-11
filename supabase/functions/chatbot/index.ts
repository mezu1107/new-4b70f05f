import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2/cors";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SYSTEM_PROMPT = `You are AM-Bot, a friendly 24/7 lead-qualification assistant for AM Enterprises — a digital marketing & software agency in Pakistan offering SEO, web development, social media marketing, Google Ads, e-commerce, app development, and branding.

Your job in 4-6 short messages:
1. Greet warmly, ask what they need help with (service interest)
2. Ask about their business type / industry
3. Ask about budget range (e.g. under 50k PKR / 50-200k / 200k+ / not sure)
4. Ask about timeline (urgent / 1 month / 3 months / exploring)
5. Collect name + email or WhatsApp number
6. Confirm and tell them a strategist will reach out within 24 hours

Keep messages SHORT (1-2 sentences max), warm, and conversational. Use emojis sparingly. After collecting all info, call the save_lead function.`;

const tools = [{
  type: "function",
  function: {
    name: "save_lead",
    description: "Call ONLY after collecting name + contact + service interest + budget. Saves the qualified lead.",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        business_type: { type: "string" },
        service_interest: { type: "string" },
        budget: { type: "string" },
        timeline: { type: "string" },
        qualified: { type: "boolean", description: "true if budget realistic and contact provided" },
        score: { type: "number", description: "0-100" },
      },
      required: ["service_interest", "qualified", "score"],
    },
  },
}];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { messages, leadId } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        tools,
      }),
    });

    if (resp.status === 429) return new Response(JSON.stringify({ error: "Rate limit, try later." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (resp.status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (!resp.ok) {
      const t = await resp.text();
      console.error("AI error", resp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const data = await resp.json();
    const choice = data.choices?.[0]?.message;
    let assistantText = choice?.content || "";
    let savedId = leadId;

    const toolCall = choice?.tool_calls?.[0];
    if (toolCall?.function?.name === "save_lead") {
      const args = JSON.parse(toolCall.function.arguments || "{}");
      const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
      const payload = {
        name: args.name, email: args.email, phone: args.phone,
        business_type: args.business_type, service_interest: args.service_interest,
        budget: args.budget, timeline: args.timeline,
        qualified: !!args.qualified, qualification_score: args.score ?? 0,
        conversation: messages, status: args.qualified ? "qualified" : "new",
      };
      if (leadId) {
        await supabase.from("chatbot_leads").update(payload).eq("id", leadId);
      } else {
        const { data: ins } = await supabase.from("chatbot_leads").insert(payload).select("id").single();
        savedId = ins?.id;
      }
      if (!assistantText) assistantText = `Thanks ${args.name || ""}! I've saved your details — our team will reach out within 24 hours. 🚀`;
    }

    return new Response(JSON.stringify({ message: assistantText, leadId: savedId, qualified: toolCall?.function?.name === "save_lead" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
