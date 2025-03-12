"use client";
import { Group, Burger, Text, Container, Avatar } from "@mantine/core";
import { useAuth } from "@/hooks/useAuth";
import { mainNavLinks } from "@/config/navigation";
import NavLinksList from "./NavLinksList";
import GoogleAuthButton from "@/features/auth/GoogleAuthButton";

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
  const { session, status } = useAuth();
    // Доступ к информации
    console.log(session?.user.id)        // ID пользователя
    console.log(session?.user.email)     // Email
    console.log(session?.user.role)      // Роль
    console.log(session?.user.settings)  // Настройки

  const handleBurgerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSidebarOpened(!sidebarOpened);
  };

  return (
    <Container size="" h="100%">
      <Group h="100%" justify="space-between">
        <Group>
          {/* Бургер меню только для авторизованных пользователей */}
          {showSidebar && (
            <Burger
              opened={sidebarOpened}
              onClick={handleBurgerClick}
              size="sm"
              hiddenFrom="sm"
            />
          )}

          {/* Основная навигация - с поддержкой только иконок на мобильных */}
          <NavLinksList
            links={mainNavLinks}
            linkComponent="nav-link"
            onLinkClick={() => {}}
            iconOnly={true} // Активируем режим только иконок на мобильных
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
          <GoogleAuthButton isAuth={status} callbackUrl="/" />
        </Group>
      </Group>
    </Container>
  );
}
