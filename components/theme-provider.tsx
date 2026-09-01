"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function suppressNextThemesScriptWarning() {
  if (typeof window === "undefined" || process.env.NODE_ENV !== "development") {
    return;
  }

  const key = "__apex_suppress_theme_script_warning__";
  if ((window as Window & { [key]?: boolean })[key]) return;
  (window as Window & { [key]?: boolean })[key] = true;

  const original = console.error;
  console.error = (...args: unknown[]) => {
    const first = args[0];
    if (
      typeof first === "string" &&
      first.includes("Encountered a script tag while rendering React component")
    ) {
      return;
    }
    original.apply(console, args);
  };
}

suppressNextThemesScriptWarning();

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
