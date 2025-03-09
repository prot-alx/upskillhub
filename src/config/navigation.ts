import {
  IconDashboard,
  IconBook,
  IconUser,
  IconSettings,
  IconHome,
} from "@tabler/icons-react";

// Навигация основного меню
export const mainNavLinks = [
  { href: "/courses", label: "Все курсы" },
  { href: "/dashboard", label: "Личный кабинет", authRequired: true },
];

// Навигация dashboard
export const dashboardLinks = [
  { href: "/dashboard", label: "Статистика", icon: IconDashboard },
  { href: "/dashboard/profile", label: "Профиль", icon: IconUser },
  { href: "/dashboard/courses", label: "Курсы", icon: IconBook },
  { href: "/dashboard/settings", label: "Настройки", icon: IconSettings },
  { href: "/", label: "На главную", icon: IconHome, divider: true },
];
