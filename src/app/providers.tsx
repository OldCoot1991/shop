"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";
import { useAppSelector } from "../lib/hooks";
import { useThemeDetection } from "../hooks/useThemeDetection";
import "../lib/i18n";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  useThemeDetection();
  const mode = useAppSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [store] = useState(() => makeStore());

  return (
    <Provider store={store}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </Provider>
  );
}
