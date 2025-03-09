// components/ui/ThemeSwitcher.tsx
"use client";
import { useState, useEffect } from "react";
import { useMantineColorScheme, SegmentedControl } from "@mantine/core";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <SegmentedControl
        value="light"
        data={[
          { label: "Светлая", value: "light" },
          { label: "Темная", value: "dark" },
        ]}
      />
    );
  }

  return (
    <SegmentedControl
      value={colorScheme}
      onChange={(value) => setColorScheme(value as "light" | "dark")}
      data={[
        { label: "Светлая", value: "light" },
        { label: "Темная", value: "dark" },
      ]}
    />
  );
}
