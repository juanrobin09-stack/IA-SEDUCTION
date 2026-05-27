import { NextResponse, type NextRequest } from "next/server";

/**
 * Middleware minimal — auth protection is handled in server layouts.
 * This only does a lightweight cookie-based redirect to avoid flash.
 */
export function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    const isDashboard = pathname.startsWith("/dashboard");
    const isAuthPage = pathname === "/login" || pathname === "/signup";

    if (!isDashboard && !isAuthPage) {
      return NextResponse.next();
    }

    // Detect Supabase session via cookie presence (works without SDK)
    const cookies = request.cookies.getAll();
    const hasSession = cookies.some(
      (c) =>
        (c.name.includes("supabase") && c.name.includes("auth")) ||
        c.name.startsWith("sb-")
    );

    if (isDashboard && !hasSession) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isAuthPage && hasSession) {
      return NextResponse.redirect(new URL("/dashboard/chat", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
};
