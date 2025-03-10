"use client";
import { MantineProvider } from "@mantine/core";
import { customColorSchemeManager } from "@/lib/settings/theme";

export default function ClientMantineProvider({
  children,
  initialTheme,
}: Readonly<{
  children: React.ReactNode;
  initialTheme: "light" | "dark";
}>) {
  return (
    <MantineProvider
      defaultColorScheme={initialTheme}
      colorSchemeManager={customColorSchemeManager}
    >
      {children}
    </MantineProvider>
  );
}
