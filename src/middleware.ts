import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Get cookie
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value === "true";

  // 🔹 If logged in, prevent access to auth pages
  if (isLoggedIn && (pathname.startsWith("/login") || pathname.startsWith("/signUp") || pathname.startsWith("/verify"))) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // 🔹 If NOT logged in and trying to access protected routes → redirect to login
  if (!isLoggedIn && (pathname.startsWith("/appointment") || pathname.startsWith("/doctor"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Otherwise, continue as normal
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signUp",
    "/verify",
    "/home/:path*",
    "/appointment/:path*",
    "/doctor/:path*",
  ],
};
