"use client";

import { useState } from "react";
import { AppShell, Container, Center, Loader, Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import AppHeader from "@/components/layout/AppHeader";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default function ClientAppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { status } = useSession();
  const pathname = usePathname();
  const [sidebarOpened, setSidebarOpened] = useState(false);

  const isDashboardPage = pathname?.startsWith("/dashboard");
  const showSidebar = status === "authenticated";

  if (status === "unauthenticated" && isDashboardPage) {
    return null;
  }

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
      <AppShell.Header>
        <AppHeader
          sidebarOpened={sidebarOpened}
          setSidebarOpened={setSidebarOpened}
          showSidebar={showSidebar}
        />
      </AppShell.Header>
      {showSidebar && (
        <AppShell.Navbar p="md">
          <DashboardSidebar onLinkClick={() => setSidebarOpened(false)} />
        </AppShell.Navbar>
      )}
      <AppShell.Main>
        <Container size="lg">{children}</Container>
      </AppShell.Main>
    </AppShell>
  );
}
