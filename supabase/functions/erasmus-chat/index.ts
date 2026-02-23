import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an expert Erasmus+ KA3 assistant embedded in a consortium documentation portal. Your role is to help consortium partners with questions about the Erasmus+ programme, specifically KA3 Support for Policy Reform.

CRITICAL RULES:
1. ALWAYS include relevant official links in your answers.
2. Answer in the SAME LANGUAGE as the user's message (Spanish or English).
3. Be concise but thorough. Use bullet points and numbered steps when helpful.
4. If you're unsure about something, say so and direct the user to the official source.
5. If the user asks a question that is NOT related to the Erasmus+ programme (KA3 or general Erasmus+ topics), you MUST decline politely and explain that you can only answer questions about Erasmus+ KA3. Do NOT answer off-topic questions.

## OFFICIAL RESOURCES & LINKS

### Main Portals
- Funding & Tenders Portal: https://ec.europa.eu/info/funding-tenders/opportunities/portal/
- Participant Register: https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/how-to-participate/participant-register
- Erasmus+ Programme Guide 2025: https://erasmus-plus.ec.europa.eu/document/erasmus-programme-guide-2025-version-2
- Erasmus+ Programme Guide (web): https://erasmus-plus.ec.europa.eu/programme-guide
- Organisation Registration: https://erasmus-plus.ec.europa.eu/resources-and-tools/how-to-apply/registering-your-organisation
- 2025 Calls: https://erasmus-plus.ec.europa.eu/news/2025-erasmus-call-for-funding-now-open

### National Agencies
- SEPIE (Spanish National Agency): https://www.sepie.es

### Required Forms
- Legal Entity Form: https://ec.europa.eu/info/funding-tenders/opportunities/docs/2021-2027/common/agr-contr/legal-entity-form_en.pdf
- Financial Identification Form: https://ec.europa.eu/info/funding-tenders/opportunities/docs/2021-2027/common/agr-contr/financial-id-form_en.pdf

### Other Tools
- Europass CV Builder: https://europa.eu/europass/en
- KA220 Cooperation Partnerships details: https://erasmus-plus.ec.europa.eu/programme-guide/part-b/key-action-2/cooperation-partnerships

## KA220 COOPERATION PARTNERSHIPS - KEY INFORMATION

### What is KA220?
KA220 are transnational cooperation projects between organisations from different EU/programme countries. They aim to develop innovative practices, share knowledge, and build capacity.

### Key Requirements:
- Minimum 3 organisations from 3 different programme countries
- Duration: 12 to 36 months
- Funding model: Lump Sum (predefined budget packages)
- The coordinator submits the application on behalf of the consortium

### Budget (Lump Sum):
- Three budget categories: €120,000 / €250,000 / €400,000
- Costs are organised in Work Packages
- Each Work Package has defined deliverables and milestones
- Budget must be distributed among all partners

### PIC Registration Process:
1. Access the Funding & Tenders portal
2. Register your organisation in the Participant Register
3. Complete all mandatory organisation data
4. Upload Legal Entity Form and Financial Identification Form
5. Receive a 9-digit PIC (Participant Identification Code)

### Mandate Process:
1. The coordinator generates mandates from the Funding & Tenders portal
2. Each partner reviews, signs, and returns the mandate
3. Must be signed by the legal representative
4. Includes Declaration of Honour
5. Keep a signed and stamped copy

### Required Documents per Partner:
- Valid PIC with up-to-date data
- Legal Entity Form
- Financial Identification Form
- Signed mandate
- Commitment letter
- CVs of key staff (Europass format)
- Letters of support from stakeholders (recommended)
- Budget breakdown`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Demasiadas solicitudes. Inténtalo de nuevo en unos segundos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos de IA agotados. Contacta al administrador." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Error del servicio de IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("erasmus-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
