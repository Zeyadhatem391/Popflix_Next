import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile"];
const authRoutes = ["/login", "/register", "/otp-verify"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // سواء Google أو Credentials
  const isAuthenticated = !!token;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/login",
    "/register",
    "/otp-verify",
  ],
};