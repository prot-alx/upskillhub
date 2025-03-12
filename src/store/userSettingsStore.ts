import { create } from "zustand";
import { Session } from "next-auth";

export interface UserSettings {
  theme: "light" | "dark";
  notifications: boolean;
  // Место для добавления новых настроек в будущем
}

export type ThemeSetting = "light" | "dark";
export type SettingsUpdate = Partial<UserSettings>;

// Интерфейс состояния хранилища
interface UserSettingsState {
  settings: UserSettings;
  isLoading: boolean;
  syncError: boolean;
  initializeFromSession: (session: Session | null) => void;
  setTheme: (theme: ThemeSetting) => Promise<void>;
  setNotifications: (enabled: boolean) => Promise<void>;
  updateSettings: (newSettings: SettingsUpdate) => Promise<void>;
}

const defaultSettings: UserSettings = {
  theme: "light",
  notifications: true,
};

// Функция для синхронизации настроек с сервером
const syncSettingsWithServer = async (
  updates: SettingsUpdate
): Promise<boolean> => {
  try {
    // Отправляем изменения на сервер
    // Важно: включаем credentials: 'include' для передачи cookie сессии
    const response = await fetch("/api/users/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
      credentials: "include",
    });

    if (!response.ok) {
      console.error(
        "Failed to sync settings with server:",
        response.statusText
      );
      return false;
    }

    console.log("Settings synced with server successfully:", updates);
    return true;
  } catch (error) {
    console.error("Error syncing settings with server:", error);
    return false;
  }
};

// Создаем хранилище с помощью Zustand
export const useUserSettings = create<UserSettingsState>((set) => ({
  settings: { ...defaultSettings },
  isLoading: true,
  syncError: false,

  // Инициализация настроек из сессии пользователя
  initializeFromSession: (session) => {
    if (session?.user?.settings) {
      const theme: ThemeSetting =
        session.user.settings.theme === "dark" ? "dark" : "light";

      const notifications: boolean =
        typeof session.user.settings.notifications === "boolean"
          ? session.user.settings.notifications
          : true;

      set({
        settings: {
          theme,
          notifications,
        },
        isLoading: false,
        syncError: false,
      });
      console.log(
        "Настройки пользователя загружены из сессии:",
        session.user.settings
      );
    } else {
      set({
        settings: { ...defaultSettings },
        isLoading: false,
        syncError: false,
      });
      console.log("Используются настройки по умолчанию");
    }
  },

  // Обновление темы
  setTheme: async (theme) => {
    // Сначала обновляем локальное состояние для мгновенной обратной связи
    set((state) => ({
      settings: { ...state.settings, theme },
      syncError: false,
    }));

    // Синхронизируем с сервером
    const syncSuccess = await syncSettingsWithServer({ theme });

    if (!syncSuccess) {
      set({ syncError: true });
    }
  },

  // Обновление настроек уведомлений
  setNotifications: async (notifications) => {
    // Сначала обновляем локальное состояние для мгновенной обратной связи
    set((state) => ({
      settings: { ...state.settings, notifications },
      syncError: false,
    }));

    // Синхронизируем с сервером
    const syncSuccess = await syncSettingsWithServer({ notifications });

    if (!syncSuccess) {
      set({ syncError: true });
    }
  },

  // Обновление нескольких настроек одновременно
  updateSettings: async (newSettings) => {
    // Обновляем локальное состояние
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
      syncError: false,
    }));

    // Синхронизируем с сервером
    const syncSuccess = await syncSettingsWithServer(newSettings);

    if (!syncSuccess) {
      set({ syncError: true });
    }
  },
}));
