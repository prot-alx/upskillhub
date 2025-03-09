import { MantineProvider } from "@mantine/core";
import { QueryProvider } from "@/providers/QueryProvider";
import AuthProvider from "@/providers/AuthProvider";
import ClientAppLayout from "@/components/layout/ClientAppLayout";
import "@mantine/core/styles.css";
import "./globals.css";

export const metadata = {
  title: "Моё приложение",
  description: "Описание приложения",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head></head>
      <body>
        <MantineProvider>
          <QueryProvider>
            <AuthProvider>
              <ClientAppLayout>{children}</ClientAppLayout>
            </AuthProvider>
          </QueryProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
