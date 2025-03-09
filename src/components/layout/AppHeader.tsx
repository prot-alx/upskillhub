// components/layout/AppHeader.tsx
"use client";

import { Group, Burger, Text, Container, Avatar } from "@mantine/core";
import { useSession } from "next-auth/react";
import GoogleLoginLogoutButton from "@/features/auth/GoogleLoginLogoutButton";
import { mainNavLinks } from "@/config/navigation";
import NavLinksList from "./NavLinksList";

interface AppHeaderProps {
  sidebarOpened: boolean;
  setSidebarOpened: (opened: boolean) => void;
  showSidebar: boolean;
}

export default function AppHeader({
  sidebarOpened,
  setSidebarOpened,
  showSidebar,
}: Readonly<AppHeaderProps>) {
  const { data: session, status } = useSession();

  return (
    <Container size="lg" h="100%">
      <Group h="100%" justify="space-between">
        <Group>
          {/* Бургер меню только для авторизованных пользователей */}
          {showSidebar && (
            <Burger
              opened={sidebarOpened}
              onClick={() => setSidebarOpened(!sidebarOpened)}
              size="sm"
              hiddenFrom="sm"
            />
          )}

          {/* Основная навигация */}
          <NavLinksList
            links={mainNavLinks}
            linkComponent="text-link"
            onLinkClick={() => {}}
          />
        </Group>

        <Group>
          {/* Аватар и имя пользователя - видны только на десктопах */}
          {status === "authenticated" && (
            <Group gap="xs" visibleFrom="sm">
              {session?.user?.image && (
                <Avatar src={session.user.image} size="sm" radius="xl" />
              )}
              <Text size="sm">{session?.user?.name}</Text>
            </Group>
          )}

          {/* Кнопка входа/выхода */}
          <GoogleLoginLogoutButton isAuth={status} callbackUrl="/" />
        </Group>
      </Group>
    </Container>
  );
}
