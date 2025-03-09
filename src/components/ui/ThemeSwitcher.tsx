"use client";

import { useState, useEffect } from "react";
import { useMantineColorScheme, SegmentedControl } from "@mantine/core";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (value: string) => {
    setColorScheme(value as "light" | "dark");
    document.cookie = `my-app-theme=${value}; path=/; max-age=31536000`;
  };

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
      onChange={handleChange}
      data={[
        { label: "Светлая", value: "light" },
        { label: "Темная", value: "dark" },
      ]}
    />
  );
}
