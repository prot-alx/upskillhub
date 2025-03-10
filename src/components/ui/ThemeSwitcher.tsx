"use client";
import { useState, useEffect } from "react";
import { useMantineColorScheme, SegmentedControl } from "@mantine/core";
import { customColorSchemeManager } from "@/lib/settings/theme";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (value: string) => {
    setColorScheme(value as "light" | "dark");
    customColorSchemeManager.set(value as "light" | "dark");
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
