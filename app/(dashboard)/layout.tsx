import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileNav } from "@/components/dashboard/MobileNav";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, daily_messages_used")
    .eq("id", user.id)
    .single();

  const plan = profile?.plan ?? "free";
  const used = profile?.daily_messages_used ?? 0;
  const credits = Math.max(0, 5 - used);

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
