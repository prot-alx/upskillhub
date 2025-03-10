import { NextRequest, NextResponse } from "next/server";
import { JWT } from "next-auth/jwt";
import { NOTIFICATIONS_COOKIE_NAME, DEFAULT_NOTIFICATIONS } from "./types";

// Получает значение настроек уведомлений из запроса или токена на сервере
export function getServerNotificationsValue(
  req: NextRequest,
  token?: JWT | null
): boolean {
  const cookieValue = req.cookies.get(NOTIFICATIONS_COOKIE_NAME)?.value;

  if (cookieValue !== undefined) {
    return cookieValue === "true";
  }

  if (token?.settings?.notifications !== undefined) {
    return token.settings.notifications as boolean;
  }

  return DEFAULT_NOTIFICATIONS;
}

// Устанавливает cookie с настройками уведомлений в ответ на сервере
export function setServerNotificationsCookie(
  response: NextResponse,
  value: boolean
): void {
  response.cookies.set(NOTIFICATIONS_COOKIE_NAME, value.toString(), {
    path: "/",
    maxAge: 31536000, // 1 год
    httpOnly: false, // Чтобы JavaScript мог читать куки на клиенте
    sameSite: "lax",
  });
}

export const notificationsServerHandler = {
  cookieName: NOTIFICATIONS_COOKIE_NAME,
  defaultValue: DEFAULT_NOTIFICATIONS,
  tokenKey: "notifications" as const,
  getValue: getServerNotificationsValue,
  setCookie: setServerNotificationsCookie,
};
