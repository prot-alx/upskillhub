"use client";
import { useEffect, useState } from "react";
import { MantineProvider } from "@mantine/core";
import { customColorSchemeManager } from "@/lib/customColorSchemeManager";

export default function ClientMantineProvider({
  children,
  initialTheme,
}: Readonly<{
  children: React.ReactNode;
  initialTheme: "light" | "dark";
}>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <MantineProvider
      defaultColorScheme={initialTheme}
      colorSchemeManager={customColorSchemeManager}
      // Указываем, что не нужно переписывать атрибуты до монтирования
      forceColorScheme={mounted ? undefined : initialTheme}
    >
      {children}
    </MantineProvider>
  );
}
