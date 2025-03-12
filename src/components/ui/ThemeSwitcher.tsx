"use client";
import { useState, useEffect } from "react";
import { SegmentedControl } from "@mantine/core";
import { useSettings } from "@/hooks/useSettings";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, updateTheme, isSettingsLoaded } = useSettings();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = async (value: string) => {
    await updateTheme(value as "light" | "dark");
  };

  // Показываем плейсхолдер до полной гидратации компонента
  if (!mounted || !isSettingsLoaded) {
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
      value={theme}
      onChange={handleChange}
      data={[
        { label: "Светлая", value: "light" },
        { label: "Темная", value: "dark" },
      ]}
    />
  );
}
