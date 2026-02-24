import type { Database } from '@/types/database.types';

export type UserRole = Database['public']['Enums']['user_role'];

// Routes publiques — accessibles sans session
export const PUBLIC_ROUTES = ['/login'] as const;

// Route racine — redirigée vers le bon dashboard selon le rôle
export const ROOT_ROUTE = '/';

// Dashboard par rôle — destination après login
export const ROLE_DASHBOARDS: Record<UserRole, string> = {
  manager: '/manager',
  agent: '/agent',
  client: '/client',
};

// Préfixes de routes protégées par rôle
export const ROLE_ROUTE_PREFIXES: Record<UserRole, string> = {
  manager: '/manager',
  agent: '/agent',
  client: '/client',
};

// Route de fallback si le rôle est inconnu
export const FALLBACK_ROUTE = '/login';
