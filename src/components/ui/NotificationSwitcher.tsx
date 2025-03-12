"use client";
import { useState, useEffect } from "react";
import { Group, Switch, Text } from "@mantine/core";
import { useSettings } from "@/hooks/useSettings";

export default function NotificationSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { notifications, updateNotifications, isSettingsLoaded } =
    useSettings();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = async (checked: boolean) => {
    await updateNotifications(checked);
  };

  if (!mounted || !isSettingsLoaded) {
    return (
      <Group align="center">
        <Text>Уведомления</Text>
        <Switch checked={true} label="Включены" />
      </Group>
    );
  }

  return (
    <Group align="center">
      <Text>Уведомления</Text>
      <Switch
        checked={notifications}
        onChange={(event) => handleChange(event.target.checked)}
        label={notifications ? "Включены" : "Отключены"}
      />
    </Group>
  );
}
