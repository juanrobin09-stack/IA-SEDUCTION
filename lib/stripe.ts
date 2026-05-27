import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "placeholder");
  }
  return _stripe;
}

export const PLANS = {
  free: {
    name: "Gratuit",
    price: 0,
    messages: 5,
    features: ["5 messages/jour", "Chat IA basique", "Générateur de messages limité"]
  },
  premium: {
    name: "Premium",
    price: 29,
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID ?? "",
    messages: -1,
    features: [
      "Messages illimités",
      "Analyse de conversations",
      "Optimiseur de profil",
      "Générateur avancé",
      "Réponses prioritaires",
      "Historique complet"
    ]
  },
  vip: {
    name: "VIP",
    price: 99,
    priceId: process.env.STRIPE_VIP_PRICE_ID ?? "",
    messages: -1,
    features: [
      "Tout Premium",
      "Coaching humain 1h/mois",
      "Audit profil complet",
      "Réponses personnalisées 24/7",
      "Accès prioritaire nouvelles features"
    ]
  }
};
