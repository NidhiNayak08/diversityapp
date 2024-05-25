// pages/_middleware.js or src/pages/_middleware.js
import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/clerk-nextjs/server";

export default clerkMiddleware({
  publicRoutes: ["/sign-in", "/sign-up"],
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sign-in and sign-up (public routes)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up).*)",
  ],
};
