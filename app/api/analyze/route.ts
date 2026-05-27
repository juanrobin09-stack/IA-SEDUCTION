import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getOpenAI } from "@/lib/openai";
import { ANALYZE_SYSTEM_PROMPT } from "@/prompts/coach";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();

    if (profile?.plan === "free") {
      return NextResponse.json(
        { error: "L'analyse de conversation nécessite un abonnement Premium" },
        { status: 403 }
      );
    }

    const { conversation } = await req.json();

    if (!conversation?.trim()) {
      return NextResponse.json({ error: "Conversation requise" }, { status: 400 });
    }

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: ANALYZE_SYSTEM_PROMPT },
        { role: "user", content: `Analyse cette conversation:\n\n${conversation}` }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 800
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("Pas de réponse");

    const result = JSON.parse(content);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Analyze API error:", error);
    return NextResponse.json({ error: "Erreur d'analyse" }, { status: 500 });
  }
}
