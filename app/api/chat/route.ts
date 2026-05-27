import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { openai } from "@/lib/openai";
import { COACH_SYSTEM_PROMPT } from "@/prompts/coach";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    // Check rate limiting for free users
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan, daily_messages_used, last_message_date")
      .eq("id", user.id)
      .single();

    const today = new Date().toISOString().split("T")[0];
    const lastDate = profile?.last_message_date;
    const usedToday = lastDate === today ? (profile?.daily_messages_used ?? 0) : 0;

    if (profile?.plan === "free" && usedToday >= 5) {
      return NextResponse.json(
        { error: "Limite de 5 messages/jour atteinte. Passez Premium !" },
        { status: 429 }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages requis" }, { status: 400 });
    }

    // Stream response from OpenAI
    const stream = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: COACH_SYSTEM_PROMPT },
        ...messages.slice(-20) // Keep last 20 messages for context
      ],
      stream: true,
      temperature: 0.85,
      max_tokens: 600
    });

    // Update usage counter
    await supabase
      .from("profiles")
      .update({
        daily_messages_used: usedToday + 1,
        last_message_date: today
      })
      .eq("id", user.id);

    // Return SSE stream
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const data = JSON.stringify(chunk);
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } finally {
          controller.close();
        }
      }
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      }
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
