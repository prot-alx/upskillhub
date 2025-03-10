"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink, Text, Box, Group } from "@mantine/core";

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
  iconOnly?: boolean;
}

export default function NavLinksList({
  links,
  title,
  onLinkClick,
  linkComponent = "nav-link",
  iconOnly = false,
}: Readonly<NavLinksListProps>) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname === href || (href !== "/" && pathname?.startsWith(href));
  };

  // Рендер NavLink в режиме "только иконки"
  const renderIconOnlyNavLink = (item: NavLinkItem) => (
    <NavLink
      component={Link}
      href={item.href}
      active={isActive(item.href)}
      onClick={onLinkClick}
      style={{
        justifyContent: "center",
        padding: "8px 10px",
      }}
      label={
        <Group gap={8} justify="center">
          {item.icon && <item.icon size="1rem" stroke={1.5} />}
          <Text visibleFrom="sm">{item.label}</Text>
        </Group>
      }
    />
  );

  // Рендер обычного NavLink
  const renderStandardNavLink = (item: NavLinkItem) => (
    <NavLink
      component={Link}
      href={item.href}
      label={item.label}
      active={isActive(item.href)}
      leftSection={item.icon && <item.icon size="1rem" stroke={1.5} />}
      onClick={onLinkClick}
    />
  );

  // Рендер обычной ссылки
  const renderTextLink = (item: NavLinkItem) => (
    <Link
      href={item.href}
      onClick={onLinkClick}
      prefetch
      style={{
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: iconOnly ? "center" : "flex-start",
        padding: "8px 0",
        fontWeight: isActive(item.href) ? 600 : 400,
        color: isActive(item.href) ? "var(--mantine-color-blue-6)" : "inherit",
      }}
    >
      {item.icon && <item.icon size="1rem" stroke={1.5} />}

      <Text
        component="span"
        ml={item.icon ? "8px" : 0}
        visibleFrom={iconOnly ? "sm" : undefined}
      >
        {item.label}
      </Text>
    </Link>
  );

  // Выбор функции рендеринга в зависимости от типа ссылки и режима отображения
  const renderLink = (item: NavLinkItem) => {
    if (linkComponent === "nav-link") {
      return iconOnly
        ? renderIconOnlyNavLink(item)
        : renderStandardNavLink(item);
    } else {
      return renderTextLink(item);
    }
  };

  return (
    <>
      {title && (
        <Text fw={500} size="sm" c="dimmed" mb="xs">
          {title}
        </Text>
      )}

      {links.map((item) => (
        <Box key={item.href}>{renderLink(item)}</Box>
      ))}
    </>
  );
}
