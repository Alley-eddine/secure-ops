'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface AppNotification {
  id: string;
  type: 'shift_published' | 'agent_assigned' | 'incident_reported' | 'flash_alert' | 'system';
  title: string;
  content: string;
  read: boolean;
  createdAt: string;
}

interface NotificationContextValue {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback((id: string) => {
    // TODO(Phase 6): PATCH /api/notifications/:id
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllAsRead = useCallback(() => {
    // TODO(Phase 6): PATCH /api/notifications/read-all
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  // TODO(Phase 6): subscribe via RealtimeProvider to 'notifications' channel
  // TODO(Phase 6): request Web Notifications API permission on mount

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
}
