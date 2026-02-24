import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import {
  isPublicRoute,
  isRootRoute,
  getDashboardForRole,
  isRouteAllowedForRole,
  getRoleFromMetadata,
} from '@/lib/rbac/helpers';
import { FALLBACK_ROUTE } from '@/lib/rbac/constants';
import type { Database } from '@/types/database.types';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pass through Next.js internals and static assets
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // No session — allow public routes, redirect everything else to login
  if (!session) {
    if (isPublicRoute(pathname) || isRootRoute(pathname)) {
      return response;
    }
    const loginUrl = new URL(FALLBACK_ROUTE, request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Session exists — redirect away from login and root
  const role = getRoleFromMetadata(session.user.app_metadata);

  if (!role) {
    // Role not in JWT yet — let AuthProvider resolve it client-side
    if (isPublicRoute(pathname) || isRootRoute(pathname)) {
      return response;
    }
    return response;
  }

  const dashboard = getDashboardForRole(role);

  // Redirect logged-in users away from login and root
  if (isPublicRoute(pathname) || isRootRoute(pathname)) {
    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  // Block access to routes belonging to a different role
  if (!isRouteAllowedForRole(pathname, role)) {
    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
