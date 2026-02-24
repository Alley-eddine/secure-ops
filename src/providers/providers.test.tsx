import { renderHook } from '@testing-library/react';
import { useFlashAlert } from './flash-alert-provider';
import { useNotifications } from './notification-provider';
import { FlashAlertProvider } from './flash-alert-provider';
import { NotificationProvider } from './notification-provider';

// AuthProvider depends on Supabase — tested via integration in 1.3
describe('FlashAlertProvider', () => {
  it('exposes null activeAlert by default', () => {
    const { result } = renderHook(() => useFlashAlert(), {
      wrapper: FlashAlertProvider,
    });
    expect(result.current.activeAlert).toBeNull();
  });

  it('throws outside provider', () => {
    expect(() => renderHook(() => useFlashAlert())).toThrow(
      'useFlashAlert must be used within FlashAlertProvider',
    );
  });
});

describe('NotificationProvider', () => {
  it('starts with empty notifications', () => {
    const { result } = renderHook(() => useNotifications(), {
      wrapper: NotificationProvider,
    });
    expect(result.current.notifications).toHaveLength(0);
    expect(result.current.unreadCount).toBe(0);
  });

  it('throws outside provider', () => {
    expect(() => renderHook(() => useNotifications())).toThrow(
      'useNotifications must be used within NotificationProvider',
    );
  });
});
