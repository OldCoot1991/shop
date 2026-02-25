"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { makeStore } from "../lib/store";
import { useAppSelector } from "../lib/hooks";
import { useThemeDetection } from "../hooks/useThemeDetection";
import "../lib/i18n";

type StoreType = ReturnType<typeof makeStore>;
type PersistorType = ReturnType<typeof persistStore>;

// Create a single store instance outside of React to avoid issues with refs during render
let storeInstance: StoreType | null = null;
let persistorInstance: PersistorType | null = null;

function getStore() {
  if (!storeInstance) {
    storeInstance = makeStore();
    persistorInstance = persistStore(storeInstance);
  }
  return { store: storeInstance, persistor: persistorInstance! };
}

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  useThemeDetection();
  const mode = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [{ store, persistor }] = useState(() => getStore());

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeWrapper>{children}</ThemeWrapper>
      </PersistGate>
    </Provider>
  );
}
