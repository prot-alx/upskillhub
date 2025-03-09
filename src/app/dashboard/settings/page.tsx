"use client";
import { useState } from "react";
import {
  Title,
  Paper,
  Switch,
  Stack,
  Group,
  Button,
  Text,
} from "@mantine/core";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [savedSettings, setSavedSettings] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 3000);
  };

  return (
    <div>
      <Title order={2} mb="lg">
        Настройки
      </Title>

      <Paper shadow="xs" p="md" withBorder>
        <form onSubmit={handleSubmit}>
          <Stack>
            <Group align="center">
              <Text>Уведомления</Text>
              <Switch
                checked={notifications}
                onChange={(event) => setNotifications(event.target.checked)}
                label={notifications ? "Включены" : "Отключены"}
              />
            </Group>
            <ThemeSwitcher/>
            <Button type="submit" color="blue">
              Сохранить
            </Button>
            {savedSettings && <Text>Настройки успешно сохранены!</Text>}
          </Stack>
        </form>
      </Paper>
    </div>
  );
}
