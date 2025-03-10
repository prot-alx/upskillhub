"use client";

import Link from "next/link";
import { Box, Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import { mainNavLinks } from "@/config/navigation";

interface MobileMenuProps {
  onLinkClick: () => void;
}

export default function MobileMenu({ onLinkClick }: Readonly<MobileMenuProps>) {
  const { status } = useSession();

  return (
    <Box
      p="md"
      style={{
        position: "fixed",
        top: 60,
        left: 0,
        right: 0,
        backgroundColor: "white",
        zIndex: 100,
        borderBottom: "1px solid var(--mantine-color-gray-3)",
      }}
    >
      {mainNavLinks.map(
        ({ href, label }) =>
          status === "authenticated" && (
            <Link
              key={href}
              href={href}
              onClick={onLinkClick}
              prefetch
              style={{
                textDecoration: "none",
                display: "block",
                padding: "8px 0",
              }}
            >
              <Text>{label}</Text>
            </Link>
          )
      )}
    </Box>
  );
}
