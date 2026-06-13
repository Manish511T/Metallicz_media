// middleware.ts  (place in project root, next to package.json)

import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match every route EXCEPT:
     *  - /maintenance        (the page itself — avoid infinite redirect)
     *  - /_next/static       (Next.js assets)
     *  - /_next/image        (image optimisation)
     *  - /favicon.ico
     *  - /logo.png, /bg.png  (public assets still need to load for maintenance page)
     */
    "/((?!maintenance|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};

export function middleware(req: NextRequest) {
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";

  if (isMaintenanceMode) {
    // Rewrite to /maintenance — URL in browser stays the same (not a redirect)
    return NextResponse.rewrite(new URL("/maintenance", req.url));
  }

  return NextResponse.next();
}