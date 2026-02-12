import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export const useHydratedAuth = () => {
  const [hydrated, setHydrated] = useState(false);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return { user, hydrated };
};