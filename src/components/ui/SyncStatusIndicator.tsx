"use client";
import { Badge, Tooltip } from "@mantine/core";
import { IconCheck, IconAlertCircle } from "@tabler/icons-react";
import { useUserSettings } from "@/store/userSettingsStore";
import { useState, useEffect } from "react";

/**
 * Компонент для отображения статуса синхронизации настроек
 */
export default function SyncStatusIndicator() {
  const { syncError } = useUserSettings();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (syncError) {
    return (
      <Tooltip label="Проблема с синхронизацией настроек">
        <Badge
          color="red"
          size="sm"
          variant="filled"
          leftSection={<IconAlertCircle size={12} />}
        >
          Ошибка синхронизации
        </Badge>
      </Tooltip>
    );
  }

  return (
    <Tooltip label="Настройки синхронизированы">
      <Badge
        color="green"
        size="sm"
        variant="filled"
        leftSection={<IconCheck size={12} />}
      >
        Синхронизировано
      </Badge>
    </Tooltip>
  );
}
