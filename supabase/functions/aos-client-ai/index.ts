import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace("Bearer ", "");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

    const admin = createClient(SUPABASE_URL, SERVICE_KEY);
    const userClient = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { data: { user }, error: userErr } = await userClient.auth.getUser();
    if (userErr || !user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const { client_id, message } = await req.json();
    if (!client_id || !message) return new Response(JSON.stringify({ error: "Missing client_id or message" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // Verify access
    const { data: access } = await admin.from("aos_client_users").select("id").eq("user_id", user.id).eq("client_id", client_id).maybeSingle();
    const { data: isAdmin } = await admin.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
    if (!access && !isAdmin) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // Load context
    const [{ data: client }, { data: projects }, { data: tasks }, { data: approvals }, { data: files }, { data: history }] = await Promise.all([
      admin.from("aos_clients").select("full_name, company_name, industry, service_package, monthly_retainer, contract_start, contract_end, status, notes").eq("id", client_id).maybeSingle(),
      admin.from("aos_projects").select("name, status, priority, start_date, end_date, progress, description").eq("client_id", client_id),
      admin.from("aos_tasks").select("title, status, priority, due_date, project_id, aos_projects!inner(client_id, name)").eq("aos_projects.client_id", client_id).limit(50),
      admin.from("aos_approvals").select("title, category, status, due_date").eq("client_id", client_id).limit(30),
      admin.from("aos_vault_files").select("name, version, created_at").eq("client_id", client_id).limit(20),
      admin.from("aos_client_chat_messages").select("role, content").eq("client_id", client_id).order("created_at", { ascending: false }).limit(10),
    ]);

    const context = `You are an AI account assistant for the client "${client?.company_name || client?.full_name}".
Answer ONLY using the data below. Be concise, professional, use bullet points when listing items. If asked about something not in the data, say you don't have that info and suggest contacting the account manager.

CLIENT: ${JSON.stringify(client)}
PROJECTS (${projects?.length || 0}): ${JSON.stringify(projects)}
TASKS (sample ${tasks?.length || 0}): ${JSON.stringify(tasks)}
APPROVALS: ${JSON.stringify(approvals)}
RECENT FILES: ${JSON.stringify(files)}`;

    const convo = [
      { role: "system", content: context },
      ...((history ?? []).reverse().map((h: any) => ({ role: h.role, content: h.content }))),
      { role: "user", content: message },
    ];

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${LOVABLE_API_KEY}` },
      body: JSON.stringify({ model: "google/gemini-2.5-flash", messages: convo }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      if (aiRes.status === 429) return new Response(JSON.stringify({ error: "Rate limited. Please try again shortly." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (aiRes.status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted. Contact your administrator." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error(`AI error: ${errText}`);
    }

    const aiData = await aiRes.json();
    const reply = aiData.choices?.[0]?.message?.content ?? "I couldn't generate a response.";

    await admin.from("aos_client_chat_messages").insert({ client_id, role: "assistant", content: reply });

    return new Response(JSON.stringify({ reply }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e: any) {
    console.error("aos-client-ai error:", e);
    return new Response(JSON.stringify({ error: e.message || "Unknown error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
