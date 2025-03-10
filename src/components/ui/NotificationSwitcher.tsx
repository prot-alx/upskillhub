"use client";
import { useState, useEffect } from "react";
import { Group, Switch, Text } from "@mantine/core";
import { notificationsClientManager } from "@/lib/settings/notifications";

export default function NotificationSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState(false);

  useEffect(() => {
    const storedValue = notificationsClientManager.get();
    setNotifications(storedValue);
    setMounted(true);
  }, []);

  const handleChange = (checked: boolean) => {
    setNotifications(checked);
    notificationsClientManager.set(checked);
  };

  if (!mounted) {
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
