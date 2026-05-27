import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getOpenAI } from "@/lib/openai";
import { PROFILE_SYSTEM_PROMPT } from "@/prompts/coach";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { bio, platform } = await req.json();

    if (!bio?.trim()) {
      return NextResponse.json({ error: "Bio requise" }, { status: 400 });
    }

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: PROFILE_SYSTEM_PROMPT },
        {
          role: "user",
          content: `Optimise ce profil ${platform || "tinder"}:\n\nBIO:\n${bio}`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
      max_tokens: 1000
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("Pas de réponse");

    const result = JSON.parse(content);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Profile API error:", error);
    return NextResponse.json({ error: "Erreur d'optimisation" }, { status: 500 });
  }
}
