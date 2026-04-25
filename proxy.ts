import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

/**
 * Root proxy (Next 16 — formerly `middleware.ts`):
 *  - Refreshes the Supabase auth session cookie on every request.
 *  - Protects `/admin/*` (admin role required) and `/konto/*` (any authenticated user).
 *
 * NOTE: actual auth enforcement lives in `lib/supabase/middleware.ts`
 * (so it can use the shared SSR Supabase client). This file only wires
 * the matcher and delegates.
 */
export async function proxy(request: NextRequest): Promise<NextResponse> {
  // Skip auth/session work when Supabase env vars are not configured
  // (e.g. quick preview deployments) — just let every request through.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next({ request: { headers: request.headers } });
  }
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     *  - _next/static, _next/image (Next internals)
     *  - favicon.ico, robots.txt, sitemap.xml
     *  - any file with an extension (images, fonts, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
