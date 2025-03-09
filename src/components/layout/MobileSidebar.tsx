"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NavLink, Text, Divider, Box, Avatar, Group } from "@mantine/core";
import { mainNavLinks, dashboardLinks } from "@/config/navigation";

interface MobileSidebarProps {
  isDashboard: boolean;
  authStatus: string;
  onLinkClick: () => void;
}

export default function MobileSidebar({
  authStatus,
  onLinkClick,
}: Readonly<MobileSidebarProps>) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isAuthenticated = authStatus === "authenticated";

  return (
    <>
      {/* Профиль пользователя */}
      {isAuthenticated && (
        <Box mb="xl">
          <Group mb="md">
            {session?.user?.image && (
              <Avatar src={session.user.image} size="md" radius="xl" />
            )}
            <div>
              <Text fw={500}>{session?.user?.name ?? "Пользователь"}</Text>
              <Text size="xs" c="dimmed">
                {session?.user?.email}
              </Text>
            </div>
          </Group>
        </Box>
      )}

      {/* Основная навигация */}
      <Text fw={500} size="sm" c="dimmed" mb="xs">
        ОСНОВНОЕ МЕНЮ
      </Text>
      {mainNavLinks.map((link) => (
        <NavLink
          key={link.href}
          component={Link}
          href={link.href}
          label={link.label}
          active={
            pathname === link.href || pathname?.startsWith(link.href + "/")
          }
          onClick={onLinkClick}
        />
      ))}

      {/* Домашняя страница всегда видна */}
      <NavLink
        component={Link}
        href="/"
        label="Главная"
        active={pathname === "/"}
        onClick={onLinkClick}
      />

      {/* Секция Dashboard меню - всегда показываем для авторизованных пользователей */}
      {isAuthenticated && (
        <>
          <Divider my="md" />
          <Text fw={500} size="sm" c="dimmed" mb="xs">
            ЛИЧНЫЙ КАБИНЕТ
          </Text>
          {dashboardLinks.map((item) => (
            <Box key={item.href}>
              <NavLink
                component={Link}
                href={item.href}
                label={item.label}
                active={pathname === item.href}
                leftSection={<item.icon size="1rem" stroke={1.5} />}
                onClick={onLinkClick}
              />
            </Box>
          ))}
        </>
      )}
    </>
  );
}
