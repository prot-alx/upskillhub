// components/layout/ClientAppLayout.tsx
"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppShell, Container, Center, Loader, Text } from "@mantine/core";
import { useSession } from "next-auth/react"; // Возвращаем импорт
import AppHeader from "@/components/layout/AppHeader";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import MobileMenu from "@/components/layout/MobileMenu";

export default function ClientAppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { status } = useSession(); // Возвращаем получение статуса
  const pathname = usePathname();
  const router = useRouter();

  // Состояния для мобильного меню и бокового меню
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
  const [navbarOpened, setNavbarOpened] = useState(true);

  // Определяем, находимся ли мы на странице dashboard
  const isDashboardPage = pathname?.startsWith("/dashboard") || false;

  // Редирект неавторизованных с dashboard
  useEffect(() => {
    if (isDashboardPage && status === "unauthenticated") {
      router.push("/");
    }
  }, [isDashboardPage, status, router]);

  // Сбрасываем состояние мобильного меню при изменении пути
  useEffect(() => {
    setMobileMenuOpened(false);
  }, [pathname]);

  // Определяем, нужно ли показывать sidebar
  // Важно: показываем только если на dashboard И пользователь авторизован
  const showSidebar = isDashboardPage && status === "authenticated";

  // Показываем индикатор загрузки для dashboard, пока проверяется статус
  if (isDashboardPage && status === "loading") {
    return (
      <AppShell header={{ height: 60 }} padding="md">
        <AppShell.Header>
          <AppHeader
            isDashboardPage={isDashboardPage}
            navbarOpened={navbarOpened}
            setNavbarOpened={setNavbarOpened}
            mobileMenuOpened={mobileMenuOpened}
            setMobileMenuOpened={setMobileMenuOpened}
          />
        </AppShell.Header>

        <AppShell.Main>
          <Center style={{ height: "calc(100vh - 60px)" }}>
            <div style={{ textAlign: "center" }}>
              <Loader size="lg" />
              <Text mt="md">Проверка авторизации...</Text>
            </div>
          </Center>
        </AppShell.Main>
      </AppShell>
    );
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: {
          desktop: !showSidebar, // Изменено: показываем только авторизованным
          mobile: !showSidebar || !navbarOpened,
        },
      }}
      padding="md"
    >
      {/* Хедер */}
      <AppShell.Header>
        <AppHeader
          isDashboardPage={isDashboardPage}
          navbarOpened={navbarOpened}
          setNavbarOpened={setNavbarOpened}
          mobileMenuOpened={mobileMenuOpened}
          setMobileMenuOpened={setMobileMenuOpened}
        />
      </AppShell.Header>

      {/* Боковая панель для dashboard */}
      <AppShell.Navbar p="md">
        <AppShell.Section>
          <DashboardSidebar onLinkClick={() => setNavbarOpened(false)} />
        </AppShell.Section>
      </AppShell.Navbar>

      {/* Мобильное меню для основной навигации */}
      {mobileMenuOpened && !isDashboardPage && (
        <MobileMenu onLinkClick={() => setMobileMenuOpened(false)} />
      )}

      {/* Основное содержимое */}
      <AppShell.Main>
        <Container size="lg">{children}</Container>
      </AppShell.Main>
    </AppShell>
  );
}
