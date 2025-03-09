// app/layout.tsx (Серверная часть)
import { MantineProvider } from "@mantine/core";
import { QueryProvider } from "@/providers/QueryProvider";
import AuthProvider from "@/providers/AuthProvider";
import ClientAppLayout from "@/components/layout/ClientAppLayout";
import "@mantine/core/styles.css";
import "./globals.css";

// Теперь метаданные могут быть экспортированы из серверного компонента
export const metadata = {
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
              <ClientAppLayout>{children}</ClientAppLayout>
            </QueryProvider>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}