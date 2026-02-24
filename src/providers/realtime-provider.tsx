'use client';

import { createContext, useContext, useRef, useCallback, type ReactNode } from 'react';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

interface RealtimeContextValue {
  // Subscribe to a named channel — returns an unsubscribe function
  subscribe: (channelName: string, handler: (payload: unknown) => void) => () => void;
}

const RealtimeContext = createContext<RealtimeContextValue | null>(null);

export function RealtimeProvider({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const channels = useRef<Map<string, RealtimeChannel>>(new Map());

  const subscribe = useCallback(
    (channelName: string, handler: (payload: unknown) => void) => {
      // Reuse existing channel if already registered
      if (channels.current.has(channelName)) {
        return () => {};
      }

      // TODO(Phase 3): configure per-channel filters (e.g. post_id, shift_id)
      const channel = supabase
        .channel(channelName)
        .on('broadcast', { event: '*' }, handler)
        .subscribe();

      channels.current.set(channelName, channel);

      return () => {
        supabase.removeChannel(channel);
        channels.current.delete(channelName);
      };
    },
    [supabase],
  );

  return <RealtimeContext.Provider value={{ subscribe }}>{children}</RealtimeContext.Provider>;
}

export function useRealtime() {
  const ctx = useContext(RealtimeContext);
  if (!ctx) throw new Error('useRealtime must be used within RealtimeProvider');
  return ctx;
}
