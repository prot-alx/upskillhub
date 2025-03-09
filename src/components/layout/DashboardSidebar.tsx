"use client";

import NavLinksList from "@/components/layout/NavLinksList";
import { dashboardLinks } from "@/config/navigation";

interface DashboardSidebarProps {
  onLinkClick?: () => void;
}

export default function DashboardSidebar({
  onLinkClick,
}: Readonly<DashboardSidebarProps>) {
  return (
    <NavLinksList
      links={dashboardLinks}
      title="ЛИЧНЫЙ КАБИНЕТ"
      onLinkClick={onLinkClick}
    />
  );
}
