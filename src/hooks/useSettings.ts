import { useEffect, useState } from "react";
import { useUserSettings } from "@/store/userSettingsStore";
import { useSession } from "next-auth/react";
import { useMantineColorScheme } from "@mantine/core";

/**
 * Хук для удобной работы с настройками пользователя
 */
export function useSettings() {
  const { data: session, status } = useSession();
  const {
    settings,
    isLoading,
    syncError,
    initializeFromSession,
    setTheme,
    setNotifications,
    updateSettings,
  } = useUserSettings();
  const { setColorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);

  // Отмечаем, что компонент смонтирован (для предотвращения ошибок гидратации)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Загружаем настройки из сессии при монтировании компонента (только на клиенте)
  useEffect(() => {
    if (mounted && status !== "loading") {
      initializeFromSession(session);
    }
  }, [mounted, session, status, initializeFromSession]);

  // Применяем тему к Mantine при изменении настроек
  useEffect(() => {
    if (mounted && settings.theme) {
      setColorScheme(settings.theme);
    }
  }, [mounted, settings.theme, setColorScheme]);

  // Обновление темы с синхронизацией Mantine и сервером
  const updateTheme = async (theme: "light" | "dark") => {
    if (mounted) {
      setColorScheme(theme);
      await setTheme(theme);
    }
  };

  // Проверка, загружены ли настройки и завершилась ли гидратация
  const isSettingsLoaded = mounted && status !== "loading" && !isLoading;

  // Принудительная синхронизация всех настроек с сервером
  const syncSettingsWithServer = async () => {
    if (isSettingsLoaded) {
      await updateSettings(settings);
    }
  };

  return {
    // Настройки (используем безопасные дефолтные значения до загрузки)
    theme: mounted ? settings.theme : "light",
    notifications: mounted ? settings.notifications : true,

    // Статусы
    isSettingsLoaded,
    hasSyncError: syncError,

    // Методы обновления
    updateTheme,
    updateNotifications: setNotifications,
    updateAllSettings: updateSettings,
    syncSettings: syncSettingsWithServer,
  };
}
