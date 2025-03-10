import { MantineColorSchemeManager } from "@mantine/core";
import {
  getCookieValue,
  setCookie,
  clearCookie,
  logClientSetting,
} from "../utils/cookieUtils";
import { Theme, THEME_COOKIE_NAME, DEFAULT_THEME } from "./types";

// Получает текущую тему из cookie на клиенте
export function getClientThemeValue(
  defaultValue: Theme = DEFAULT_THEME
): Theme {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  const cookieValue = getCookieValue(THEME_COOKIE_NAME);
  logClientSetting("theme", cookieValue ?? defaultValue);

  return (cookieValue as Theme) || defaultValue;
}

// Устанавливает тему в cookie на клиенте
export function setClientThemeValue(value: Theme): void {
  setCookie(THEME_COOKIE_NAME, value);
}

// Удаляет cookie с темой на клиенте
export function clearClientThemeValue(): void {
  clearCookie(THEME_COOKIE_NAME);
}

// Объект-менеджер для использования в приложении
export const themeClientManager = {
  get: getClientThemeValue,
  set: setClientThemeValue,
  clear: clearClientThemeValue,
};

// Mantine color scheme manager для интеграции с системой тем Mantine
export const customColorSchemeManager: MantineColorSchemeManager = {
  get: (defaultValue) => themeClientManager.get(defaultValue as Theme),
  set: (value) => themeClientManager.set(value as Theme),
  subscribe: () => {}, // Не используется в Mantine
  unsubscribe: () => {}, // Не используется в Mantine
  clear: () => themeClientManager.clear(),
};
