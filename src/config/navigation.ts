import {
  IconDashboard,
  IconBook,
  IconUser,
  IconSettings,
  IconHome,
  IconSchool,
} from "@tabler/icons-react";

// Основная навигация
export const mainNavLinks = [
  { href: "/", label: "Главная", icon: IconHome },
  { href: "/courses", label: "Все курсы", icon: IconSchool },
];

// Навигация dashboard для авторизованных пользователей
export const dashboardLinks = [
  { href: "/dashboard", label: "Статистика", icon: IconDashboard },
  { href: "/dashboard/profile", label: "Профиль", icon: IconUser },
  { href: "/dashboard/courses", label: "Курсы", icon: IconBook },
  { href: "/dashboard/settings", label: "Настройки", icon: IconSettings },
];
