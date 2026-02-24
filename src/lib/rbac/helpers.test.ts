import {
  isPublicRoute,
  isRootRoute,
  getDashboardForRole,
  isRouteAllowedForRole,
  getRoleFromMetadata,
} from './helpers';

describe('isPublicRoute', () => {
  it('returns true for /login', () => {
    expect(isPublicRoute('/login')).toBe(true);
  });

  it('returns false for protected routes', () => {
    expect(isPublicRoute('/manager')).toBe(false);
    expect(isPublicRoute('/agent')).toBe(false);
    expect(isPublicRoute('/client')).toBe(false);
  });
});

describe('isRootRoute', () => {
  it('returns true for /', () => {
    expect(isRootRoute('/')).toBe(true);
  });

  it('returns false for other routes', () => {
    expect(isRootRoute('/manager')).toBe(false);
  });
});

describe('getDashboardForRole', () => {
  it('returns correct dashboard per role', () => {
    expect(getDashboardForRole('manager')).toBe('/manager');
    expect(getDashboardForRole('agent')).toBe('/agent');
    expect(getDashboardForRole('client')).toBe('/client');
  });
});

describe('isRouteAllowedForRole', () => {
  it('allows manager to access /manager routes', () => {
    expect(isRouteAllowedForRole('/manager', 'manager')).toBe(true);
    expect(isRouteAllowedForRole('/manager/users', 'manager')).toBe(true);
  });

  it('blocks manager from accessing /agent routes', () => {
    expect(isRouteAllowedForRole('/agent', 'manager')).toBe(false);
  });

  it('allows agent to access /agent routes', () => {
    expect(isRouteAllowedForRole('/agent', 'agent')).toBe(true);
  });

  it('blocks agent from accessing /manager routes', () => {
    expect(isRouteAllowedForRole('/manager', 'agent')).toBe(false);
  });
});

describe('getRoleFromMetadata', () => {
  it('extracts valid roles', () => {
    expect(getRoleFromMetadata({ role: 'manager' })).toBe('manager');
    expect(getRoleFromMetadata({ role: 'agent' })).toBe('agent');
    expect(getRoleFromMetadata({ role: 'client' })).toBe('client');
  });

  it('returns null for invalid or missing role', () => {
    expect(getRoleFromMetadata({})).toBeNull();
    expect(getRoleFromMetadata({ role: 'admin' })).toBeNull();
    expect(getRoleFromMetadata({ role: undefined })).toBeNull();
  });
});
