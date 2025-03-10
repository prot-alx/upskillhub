"use client";

import { Title, Paper, Stack } from "@mantine/core";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import NotificationSwitcher from "@/components/ui/NotificationSwitcher";

export default function SettingsPage() {
  return (
    <div>
      <Title order={2} mb="lg">
        Настройки
      </Title>
      <Paper shadow="xs" p="md" withBorder>
        <Stack>
          <NotificationSwitcher />
          <ThemeSwitcher />
        </Stack>
      </Paper>
    </div>
  );
}
