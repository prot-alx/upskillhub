import {
  IconDashboard,
  IconBook,
  IconUser,
  IconSettings,
} from "@tabler/icons-react";

// Основная навигация
export const mainNavLinks = [
  { href: "/", label: "Главная" },
  { href: "/courses", label: "Все курсы" },
];

// Навигация dashboard для авторизованных пользователей
export const dashboardLinks = [
  { href: "/dashboard", label: "Статистика", icon: IconDashboard },
  { href: "/dashboard/profile", label: "Профиль", icon: IconUser },
  { href: "/dashboard/courses", label: "Курсы", icon: IconBook },
  { href: "/dashboard/settings", label: "Настройки", icon: IconSettings },
];
