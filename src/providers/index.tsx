'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from './theme-provider';
import { QueryProvider } from './query-provider';
import { AuthProvider } from './auth-provider';
import { RealtimeProvider } from './realtime-provider';
import { FlashAlertProvider } from './flash-alert-provider';
import { NotificationProvider } from './notification-provider';

/**
 * Order matters:
 * 1. ThemeProvider    — no deps
 * 2. QueryProvider    — no deps
 * 3. AuthProvider     — needs Supabase client (via lib/supabase/client)
 * 4. RealtimeProvider — needs Supabase client
 * 5. FlashAlertProvider — will need RealtimeProvider in Phase 6
 * 6. NotificationProvider — will need RealtimeProvider in Phase 6
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <RealtimeProvider>
            <FlashAlertProvider>
              <NotificationProvider>{children}</NotificationProvider>
            </FlashAlertProvider>
          </RealtimeProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
