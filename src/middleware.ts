import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const isAuth = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });
    const isAuthRoutes = pathname.startsWith("/login")

    const protectedRoutes = ["/profile"];
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );


    if (!isAuth && isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }


    if (isAuth && isAuthRoutes) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/profile/:path*", "/login"],
};
