"use client";

import { useUserStore } from "@/modules/(auth)/register/store/register.store";
import { useFavoritesStore } from "@/modules/favorites/store/favorites.store";
import { useEffect, useState } from "react";

function ZustandProviders({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const hydrate = async () => {
      await Promise.all([
        useUserStore.persist.rehydrate(),
        useFavoritesStore.persist.rehydrate(),
      ]);

      setHydrated(true);
    };

    hydrate();
  }, []);

  if (!hydrated) {
    return null;
  }

  return children;
}

export default ZustandProviders;
