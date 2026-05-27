import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { openai } from "@/lib/openai";
import { MESSAGE_SYSTEM_PROMPT } from "@/prompts/coach";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { category, context, styles } = await req.json();

    if (!category) {
      return NextResponse.json({ error: "Catégorie requise" }, { status: 400 });
    }

    const stylesStr = styles?.join(", ") || "drôle, alpha, mystérieux";

    const prompt = `Génère des messages pour la situation: "${category}"
Styles demandés: ${stylesStr}
Contexte: ${context || "Aucun contexte supplémentaire"}

Génère un message par style demandé.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: MESSAGE_SYSTEM_PROMPT },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.9,
      max_tokens: 800
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("Pas de réponse");

    const result = JSON.parse(content);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Messages API error:", error);
    return NextResponse.json({ error: "Erreur de génération" }, { status: 500 });
  }
}
