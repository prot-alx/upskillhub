import type { Metadata } from "next";
import { QueryProvider } from "@/providers/QueryProvider";
import { MantineProvider } from "@mantine/core";
import AuthProvider from "@/providers/AuthProvider";
import "./globals.css";
import "@mantine/core/styles.css";

export const metadata: Metadata = {
  title: "Моё приложение",
  description: "Описание приложения",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <MantineProvider>
          <AuthProvider>
            <QueryProvider>
              {children}
            </QueryProvider>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
