// import { authMiddleware } from "@clerk/nextjs";

// // See https://clerk.com/docs/references/nextjs/auth-middleware
// // for more information about configuring your Middleware

// export default authMiddleware({
//   // Allow signed out users to access the specified routes:
//   publicRoutes: ["/"],
//   // Prevent the specified routes from accessing
//   // authentication information:
//   // ignoredRoutes: ['/no-auth-in-this-route'],
// });

// export const config = {
//   matcher: [
//     // Exclude files with a "." followed by an extension, which are typically static files.
//     // Exclude files in the _next directory, which are Next.js internals.

//     "/((?!.+\\.[\\w]+$|_next).*)",
//     // Re-include any files in the api or trpc folders that might have an extension
//     "/(api|trpc)(.*)",
//   ],
// };

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
