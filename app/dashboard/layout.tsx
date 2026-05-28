import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileNav } from "@/components/dashboard/MobileNav";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  let user: { id: string; email?: string; user_metadata?: Record<string, unknown> } | null = null;
  let plan = "free";
  let credits = 5;

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;

    if (!user) redirect("/login");

    const { data: profile } = await supabase
      .from("profiles")
      .select("plan, daily_messages_used")
      .eq("id", user.id)
      .single();

    plan = profile?.plan ?? "free";
    const used = profile?.daily_messages_used ?? 0;
    credits = Math.max(0, 5 - used);
  } catch (err) {
    // Re-throw Next.js redirect/notFound errors (they have a 'digest' property)
    if (err != null && typeof err === "object" && "digest" in err) throw err;
    // Otherwise, Supabase is not configured — go to login
    redirect("/login");
  }

  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen bg-bg-primary">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar userEmail={user.email} plan={plan} credits={credits} />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>

      {/* Mobile nav */}
      <MobileNav />
    </div>
  );
}
