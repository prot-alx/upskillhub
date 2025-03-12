import {
  ClientMantineProvider,
  QueryProvider,
  AuthProvider,
  SettingsProvider,
} from "@/providers";
import "@mantine/core/styles.css";

export const metadata = {
  title: "UpskillHub",
  description: "Платформа онлайн-обучения",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head></head>
      <body>
        {/* Важно соблюдать правильный порядок провайдеров */}
        <ClientMantineProvider>
          <QueryProvider>
            <AuthProvider>
              <SettingsProvider>{children}</SettingsProvider>
            </AuthProvider>
          </QueryProvider>
        </ClientMantineProvider>
      </body>
    </html>
  );
}
