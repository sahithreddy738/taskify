import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
  const { userId, orgId } = await auth();
  if (userId && isPublicRoute(request)) {
    let path = "/select-org";
    if (orgId) path = `/organization/`+orgId;
    const orgURL = new URL(path, request.url);
    return NextResponse.redirect(orgURL);
  }
  if (userId && !orgId && request.nextUrl.pathname !== "/select-org") {
    const selectOrgURL = new URL("/select-org", request.url);
    return NextResponse.redirect(selectOrgURL);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
