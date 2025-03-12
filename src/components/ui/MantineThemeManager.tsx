"use client";
import { useEffect, useState } from "react";
import { useMantineColorScheme } from "@mantine/core";
import { useUserSettings } from "@/store/userSettingsStore";

/**
 * Компонент для управления темой Mantine на основе данных из хранилища настроек
 * Этот компонент не отображает ничего, а только следит за изменениями темы
 */
export default function MantineThemeManager() {
  const { settings } = useUserSettings();
  const { setColorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);

  // При первом рендере на клиенте устанавливаем флаг mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Синхронизируем тему Mantine с настройками пользователя только на клиенте после гидратации
  useEffect(() => {
    // Меняем тему только после гидратации компонента
    if (mounted && settings.theme) {
      setColorScheme(settings.theme);
    }
  }, [mounted, settings.theme, setColorScheme]);

  // Компонент не рендерит ничего
  return null;
}
