import { cookies } from "next/headers";
import ClientMantineProvider from "@/components/ClientMantineProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import AuthProvider from "@/providers/AuthProvider";
import "@mantine/core/styles.css";
import "./globals.css";

export const metadata = {
  title: "UpskillHub",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialTheme =
    (cookieStore.get("my-app-theme")?.value as "light" | "dark") || "light";

  return (
    <html lang="ru" data-mantine-color-scheme={initialTheme}>
      <head></head>
      <body>
        <ClientMantineProvider initialTheme={initialTheme}>
          <QueryProvider>
            <AuthProvider>{children}</AuthProvider>
          </QueryProvider>
        </ClientMantineProvider>
      </body>
    </html>
  );
}
