import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getStripe, PLANS } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { plan } = await req.json();

    if (plan !== "premium" && plan !== "vip") {
      return NextResponse.json({ error: "Plan invalide" }, { status: 400 });
    }

    const planConfig = PLANS[plan as "premium" | "vip"];

    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: user.email,
      line_items: [{ price: planConfig.priceId, quantity: 1 }],
      metadata: { userId: user.id, plan },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
      subscription_data: { metadata: { userId: user.id, plan } }
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Erreur de paiement" }, { status: 500 });
  }
}
