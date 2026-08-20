import { useState, useEffect } from 'react';

// Shared state so multiple components in the app stay in sync with simulation toggle
let globalSimulatedOffline = false;
const listeners = new Set<(isOffline: boolean) => void>();

export function useNetworkStatus() {
  const [isBrowserOnline, setIsBrowserOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(globalSimulatedOffline);

  useEffect(() => {
    const handleOnline = () => setIsBrowserOnline(true);
    const handleOffline = () => setIsBrowserOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const listener = (val: boolean) => {
      setIsSimulatedOffline(val);
    };
    listeners.add(listener);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      listeners.delete(listener);
    };
  }, []);

  const toggleSimulatedOffline = () => {
    globalSimulatedOffline = !globalSimulatedOffline;
    listeners.forEach((fn) => fn(globalSimulatedOffline));
  };

  const setSimulatedOfflineState = (val: boolean) => {
    globalSimulatedOffline = val;
    listeners.forEach((fn) => fn(globalSimulatedOffline));
  };

  // Effective status considers both actual browser status and simulation
  const isOnline = isBrowserOnline && !isSimulatedOffline;

  return {
    isOnline,
    isBrowserOnline,
    isSimulatedOffline,
    toggleSimulatedOffline,
    setSimulatedOfflineState,
  };
}
