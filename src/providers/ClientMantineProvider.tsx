"use client";
import { MantineProvider } from "@mantine/core";

export default function ClientMantineProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MantineProvider defaultColorScheme="light">{children}</MantineProvider>
  );
}
