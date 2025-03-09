"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink, Text, Divider, Box } from "@mantine/core";
import { dashboardLinks } from "@/config/navigation";

interface DashboardSidebarProps {
  onLinkClick?: () => void;
}

export default function DashboardSidebar({
  onLinkClick,
}: Readonly<DashboardSidebarProps>) {
  const pathname = usePathname();

  return (
    <>
      <Text fw={500} size="sm" c="dimmed" mb="xs">
        НАВИГАЦИЯ
      </Text>

      {dashboardLinks.map((item) => (
        <Box key={item.href}>
          {item.divider && <Divider my="sm" />}
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
  );
}
