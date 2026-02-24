import type { UserRole } from './constants';
import { PUBLIC_ROUTES, ROOT_ROUTE, ROLE_DASHBOARDS, ROLE_ROUTE_PREFIXES } from './constants';

/**
 * Returns true if the pathname is publicly accessible (no session required).
 */
export function isPublicRoute(pathname: string): boolean {
  return (PUBLIC_ROUTES as readonly string[]).includes(pathname);
}

/**
 * Returns true if the pathname is the root route.
 */
export function isRootRoute(pathname: string): boolean {
  return pathname === ROOT_ROUTE;
}

/**
 * Returns the dashboard URL for a given role.
 */
export function getDashboardForRole(role: UserRole): string {
  return ROLE_DASHBOARDS[role];
}

/**
 * Returns true if the pathname is accessible by the given role.
 * A route is accessible if it starts with the role's prefix
 * or if it is a public/shared route.
 */
export function isRouteAllowedForRole(pathname: string, role: UserRole): boolean {
  const allowedPrefix = ROLE_ROUTE_PREFIXES[role];
  return pathname.startsWith(allowedPrefix);
}

/**
 * Extracts the user role from the Supabase session's JWT app_metadata.
 * Falls back to null if not present — role will be fetched from DB in AuthProvider.
 */
export function getRoleFromMetadata(appMetadata: Record<string, unknown>): UserRole | null {
  const role = appMetadata?.role;
  if (role === 'manager' || role === 'agent' || role === 'client') {
    return role;
  }
  return null;
}
