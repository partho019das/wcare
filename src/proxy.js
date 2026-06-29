// /src/proxy.js

import { NextResponse } from "next/server";

export function proxy(request) {
  const pathname = request.nextUrl.pathname;

  const publicRoutes = ["/", "/login", "/register"];

  const isPublicRoute = publicRoutes.includes(pathname);

  const session =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};