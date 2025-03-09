// components/layout/AppHeader.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Group, Burger, Avatar, Text, Container } from "@mantine/core";
import { useSession } from "next-auth/react";
import GoogleLoginLogoutButton from "@/features/auth/GoogleLoginLogoutButton";
import { mainNavLinks } from "@/config/navigation";

interface AppHeaderProps {
  isDashboardPage: boolean;
  navbarOpened: boolean;
  setNavbarOpened: (opened: boolean) => void;
  mobileMenuOpened: boolean;
  setMobileMenuOpened: (opened: boolean) => void;
}

export default function AppHeader({
  isDashboardPage,
  navbarOpened,
  setNavbarOpened,
  mobileMenuOpened,
  setMobileMenuOpened,
}: Readonly<AppHeaderProps>) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <Container size="lg" h="100%">
      <Group h="100%" justify="space-between">
        <Group>
          {/* Бургер для бокового меню dashboard */}
          {isDashboardPage && (
            <Burger
              opened={navbarOpened}
              onClick={() => setNavbarOpened(!navbarOpened)}
              size="sm"
              hiddenFrom="sm"
            />
          )}

          {/* Бургер для основного меню (на мобильных) */}
          {!isDashboardPage && (
            <Burger
              opened={mobileMenuOpened}
              onClick={() => setMobileMenuOpened(!mobileMenuOpened)}
              size="sm"
              hiddenFrom="sm"
            />
          )}

          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Text fw={700} size="lg">
              Главная
            </Text>
          </Link>

          {/* Основная навигация - видна только на десктопах */}
          <Group ml="xl" gap="md" visibleFrom="sm">
            {mainNavLinks.map(
              ({ href, label, authRequired }) =>
                (!authRequired || status === "authenticated") && (
                  <Link
                    key={href}
                    href={href}
                    style={{ textDecoration: "none" }}
                  >
                    <Text
                      component="span"
                      c={pathname?.startsWith(href) ? "blue" : undefined}
                      fw={pathname?.startsWith(href) ? 600 : 400}
                    >
                      {label}
                    </Text>
                  </Link>
                )
            )}
          </Group>
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
