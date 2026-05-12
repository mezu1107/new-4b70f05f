import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

interface Body {
  tool: "ad-copy" | "ad-optimizer";
  // Ad-copy fields
  product?: string;
  audience?: string;
  offer?: string;
  platform?: string; // google | meta
  tone?: string;
  // Optimizer fields
  campaign_summary?: string;
  metrics?: string;
  // Lead capture
  email?: string;
  name?: string;
}

const SYSTEM_BASE =
  "You are a senior performance-marketing strategist for AM Enterprises, a US/Canada agency. Be concise, concrete, conversion-focused.";

const buildPrompt = (b: Body) => {
  if (b.tool === "ad-copy") {
    return `Write 5 high-converting ${b.platform || "Google"} ad variations (headlines + descriptions) for:
- Product/Service: ${b.product}
- Target audience: ${b.audience}
- Offer: ${b.offer || "Free consultation"}
- Tone: ${b.tone || "confident, benefit-led"}

Return clean Markdown:
### Variation 1
**Headlines:** (3, max 30 chars each)
**Descriptions:** (2, max 90 chars each)
... continue through Variation 5.
End with a one-line targeting tip.`;
  }
  return `Audit this ad campaign and give 5 specific optimizations ranked by expected impact.
Campaign: ${b.campaign_summary}
Current metrics: ${b.metrics || "not provided"}

Return clean Markdown:
1. **Title** — what to change, why, and the predicted lift in CTR/CPL/ROAS.
Keep each item ≤ 3 sentences. End with one quick-win to ship today.`;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = (await req.json()) as Body;
    if (!body?.tool) {
      return new Response(JSON.stringify({ error: "tool is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");

    // Capture lead (best-effort, non-blocking)
    if (body.email) {
      try {
        const supa = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
        );
        await supa.from("contact_leads").insert({
          name: body.name || null,
          email: body.email,
          message: `AI ${body.tool} request: ${body.product || body.campaign_summary || ""}`.slice(0, 500),
          source: `ai-${body.tool}`,
        });
      } catch (e) {
        console.error("lead insert failed", e);
      }
    }

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_BASE },
          { role: "user", content: buildPrompt(body) },
        ],
      }),
    });

    if (resp.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit, try again shortly." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (resp.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!resp.ok) {
      const t = await resp.text();
      console.error("AI gateway error", resp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const message = data.choices?.[0]?.message?.content || "No response.";
    return new Response(JSON.stringify({ message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
