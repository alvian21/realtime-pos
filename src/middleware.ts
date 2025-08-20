// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  if(token && request.nextUrl.pathname === "/login"){
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Proteksi halaman /
  if (!token && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Proteksi halaman /admin/*
  if (!token && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Middleware hanya aktif di "/" dan "/admin/*"
export const config = {
  matcher: ["/", "/admin/:path*", "/login"],
};
