"use client";

import { useState, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppShell, Container, Center, Loader, Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import AppHeader from "@/components/layout/AppHeader";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default function ClientAppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpened, setSidebarOpened] = useState(true);

  // потом перенести состояние в стейт менеджер
  const isDashboardPage = useMemo(() => pathname?.startsWith("/dashboard"), [pathname]);

  useEffect(() => {
    if (status === "unauthenticated" && isDashboardPage) {
      router.replace("/");
    }
  }, [status, isDashboardPage, router]);

  const showSidebar = status === "authenticated";

  if (isDashboardPage && status === "loading") {
    return (
      <AppShell header={{ height: 60 }} padding="md">
        <AppShell.Header>
          <AppHeader
            sidebarOpened={sidebarOpened}
            setSidebarOpened={setSidebarOpened}
            showSidebar={showSidebar}
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
          mobile: !showSidebar || !sidebarOpened,
          desktop: !showSidebar,
        },
      }}
      padding="md"
    >
      {/* Хедер */}
      <AppShell.Header>
        <AppHeader
          sidebarOpened={sidebarOpened}
          setSidebarOpened={setSidebarOpened}
          showSidebar={showSidebar}
        />
      </AppShell.Header>

      {/* Боковая панель dashboard - только для авторизованных */}
      {showSidebar && (
        <AppShell.Navbar p="md">
          <DashboardSidebar onLinkClick={() => setSidebarOpened(false)} />
        </AppShell.Navbar>
      )}

      {/* Основное содержимое */}
      <AppShell.Main>
        <Container size="lg">{children}</Container>
      </AppShell.Main>
    </AppShell>
  );
}
