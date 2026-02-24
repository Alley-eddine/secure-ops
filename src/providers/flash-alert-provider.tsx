'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface FlashAlert {
  id: string;
  content: string;
  priority: 'standard' | 'critical';
  createdAt: string;
}

interface FlashAlertContextValue {
  activeAlert: FlashAlert | null;
  // Marks the current alert as read — persisted to instruction_reads in Phase 6
  dismissAlert: () => void;
}

const FlashAlertContext = createContext<FlashAlertContextValue | null>(null);

export function FlashAlertProvider({ children }: { children: ReactNode }) {
  const [activeAlert, setActiveAlert] = useState<FlashAlert | null>(null);

  const dismissAlert = useCallback(() => {
    // TODO(Phase 6): POST to instruction_reads before clearing state
    setActiveAlert(null);
  }, []);

  // TODO(Phase 6): subscribe to Supabase Realtime broadcast on 'flash_alerts' channel
  // and call setActiveAlert when a new flash arrives

  return (
    <FlashAlertContext.Provider value={{ activeAlert, dismissAlert }}>
      {children}
    </FlashAlertContext.Provider>
  );
}

export function useFlashAlert() {
  const ctx = useContext(FlashAlertContext);
  if (!ctx) throw new Error('useFlashAlert must be used within FlashAlertProvider');
  return ctx;
}
