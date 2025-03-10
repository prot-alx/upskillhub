import {
  getCookieValue,
  setCookie,
  clearCookie,
  logClientSetting,
} from "../utils/cookieUtils";
import { NOTIFICATIONS_COOKIE_NAME, DEFAULT_NOTIFICATIONS } from "./types";

// Получает текущие настройки уведомлений из cookie на клиенте
export function getClientNotificationsValue(
  defaultValue: boolean = DEFAULT_NOTIFICATIONS
): boolean {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  const cookieValue = getCookieValue(NOTIFICATIONS_COOKIE_NAME);
  logClientSetting("notifications", cookieValue ?? defaultValue);

  if (cookieValue === "true") return true;
  if (cookieValue === "false") return false;
  return defaultValue;
}

// Устанавливает настройки уведомлений в cookie на клиенте
export function setClientNotificationsValue(value: boolean): void {
  setCookie(NOTIFICATIONS_COOKIE_NAME, value.toString());
}

// Удаляет cookie с настройками уведомлений на клиенте
export function clearClientNotificationsValue(): void {
  clearCookie(NOTIFICATIONS_COOKIE_NAME);
}

export const notificationsClientManager = {
  get: getClientNotificationsValue,
  set: setClientNotificationsValue,
  clear: clearClientNotificationsValue,
};
