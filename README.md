# DRAGUE.ME — Coach IA Séduction

MVP ultra-rapide d'un coach IA de séduction. Stack : Next.js 15, Supabase, Stripe, OpenAI GPT-4o, TailwindCSS, Framer Motion.

## Setup rapide (15 min)

### 1. Clone & install

```bash
git clone https://github.com/juanrobin09-stack/IA-SEDUCTION.git
cd IA-SEDUCTION
npm install
```

### 2. Variables d'environnement

```bash
cp .env.example .env.local
```

Remplis `.env.local` :

| Variable | Où le trouver |
|----------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase > Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase > Settings > API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase > Settings > API |
| `OPENAI_API_KEY` | platform.openai.com/api-keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | dashboard.stripe.com/apikeys |
| `STRIPE_SECRET_KEY` | dashboard.stripe.com/apikeys |
| `STRIPE_WEBHOOK_SECRET` | Stripe CLI ou dashboard webhooks |
| `STRIPE_PREMIUM_PRICE_ID` | Stripe > Produits > Premium |
| `STRIPE_VIP_PRICE_ID` | Stripe > Produits > VIP |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` en dev |

### 3. Supabase — Base de données

1. Crée un projet sur [supabase.com](https://supabase.com)
2. Va dans SQL Editor et exécute le fichier `supabase/migrations/001_initial.sql`
3. Active l'authentification par email dans Auth > Providers

### 4. Stripe — Produits

Crée 2 produits dans le dashboard Stripe :
- **Premium** : 29€/mois → récupère le Price ID
- **VIP** : 99€/mois → récupère le Price ID

Pour les webhooks en développement :
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### 5. Lancer en développement

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000)

## Déploiement Vercel

```bash
vercel deploy
```

Configure les variables d'environnement dans Vercel > Settings > Environment Variables.

Configure le webhook Stripe vers `https://ton-domaine.vercel.app/api/stripe/webhook`.

## Structure du projet

```
app/
├── (auth)/           # Login, Signup
├── (dashboard)/      # Chat, Analyse, Profil, Messages, Settings
├── api/              # Chat (streaming), Analyze, Profile, Messages, Stripe
└── page.tsx          # Landing page

components/
├── landing/          # Hero, Features, Demo, Testimonials, Pricing, Navbar, Footer
├── dashboard/        # Sidebar, MobileNav
└── ui/               # Button, Card, Input, Textarea, Badge

prompts/
└── coach.ts          # Tous les system prompts IA

lib/
├── openai.ts         # Client OpenAI
├── stripe.ts         # Client Stripe + plans
├── supabase/         # Client Supabase (browser + server)
└── utils.ts          # Utilitaires

supabase/migrations/
└── 001_initial.sql   # Schema DB complet
```

## Features MVP

- **Chat IA** avec streaming SSE (GPT-4o)
- **Analyse de conversation** avec score et réponse conseillée
- **Optimiseur de profil** Tinder/Instagram/Bumble/Hinge
- **Générateur de messages** (6 catégories × 5 styles)
- **Freemium** : 5 messages/jour gratuits
- **Paiement Stripe** Premium (29€) et VIP (99€)
- **Auth Supabase** email/password
- **Design** dark mode, glassmorphism, animations Framer Motion
- **Mobile first** avec navigation bottom bar
- **Streaming** pour le chat (réponses progressives)

## Roadmap V2

- [ ] Upload de screenshots (analyse visuelle)
- [ ] Historique des conversations
- [ ] Partage de réponses (viral TikTok)
- [ ] Voice AI
