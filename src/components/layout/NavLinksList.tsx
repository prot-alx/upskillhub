"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink, Text, Box } from "@mantine/core";

export interface NavLinkItem {
  href: string;
  label: string;
  icon?: React.ElementType;
}

interface NavLinksListProps {
  links: NavLinkItem[];
  title?: string;
  onLinkClick?: () => void;
  linkComponent?: "nav-link" | "text-link";
}

export default function NavLinksList({
  links,
  title,
  onLinkClick,
  linkComponent = "nav-link",
}: Readonly<NavLinksListProps>) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname === href || (href !== "/" && pathname?.startsWith(href));
  };

  return (
    <>
      {title && (
        <Text fw={500} size="sm" c="dimmed" mb="xs">
          {title}
        </Text>
      )}
      {links.map((item) => (
        <Box key={item.href}>
          {linkComponent === "nav-link" ? (
            <NavLink
              component={Link}
              href={item.href}
              label={item.label}
              active={isActive(item.href)}
              leftSection={item.icon && <item.icon size="1rem" stroke={1.5} />}
              onClick={onLinkClick}
            />
          ) : (
            <Link
              href={item.href}
              onClick={onLinkClick}
              prefetch
              style={{
                textDecoration: "none",
                display: "block",
                padding: "8px 0",
                fontWeight: isActive(item.href) ? 600 : 400,
                color: isActive(item.href)
                  ? "var(--mantine-color-blue-6)"
                  : "inherit",
              }}
            >
              <Text component="span">{item.label}</Text>
            </Link>
          )}
        </Box>
      ))}
    </>
  );
}
