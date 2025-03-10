"use client";
import { useState, useEffect } from "react";
import { Group, Switch, Text } from "@mantine/core";
import { notificationManager } from "@/lib/notificationManager";

export default function NotificationSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState(false);

  useEffect(() => {
    // Получаем значение из cookies после монтирования
    const storedValue = notificationManager.get();
    setNotifications(storedValue);
    setMounted(true);
  }, []);

  const handleChange = (checked: boolean) => {
    setNotifications(checked);
    notificationManager.set(checked);
    // Обновляем cookie
    document.cookie = `my-app-notifications=${checked}; path=/; max-age=31536000`;
  };

  // Если компонент еще не смонтирован, рендерим с значением по умолчанию
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
