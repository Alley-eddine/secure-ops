'use client';

import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Don't refetch on window focus in dev to avoid noise
        refetchOnWindowFocus: process.env.NODE_ENV === 'production',
        // 30s stale time — real-time data is handled via Supabase Realtime
        staleTime: 30 * 1000,
        retry: 1,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

// Singleton for server rendering to avoid creating a new client on every request
let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always create a new client
    return makeQueryClient();
  }
  // Browser: reuse client across renders
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}

export function QueryProvider({ children }: { children: ReactNode }) {
  // useState ensures the client is not recreated on every render
  const [queryClient] = useState(() => getQueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
