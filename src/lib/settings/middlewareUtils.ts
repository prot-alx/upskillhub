import { NextRequest, NextResponse } from "next/server";
import { JWT } from "next-auth/jwt";
import { themeServerHandler } from "./theme/serverHandler";
import { notificationsServerHandler } from "./notifications/serverHandler";

// Применяет все пользовательские настройки к ответу в middleware
export function applyAllSettings(
  req: NextRequest,
  response: NextResponse,
  token?: JWT | null
): void {
  // Применяем настройки темы
  const theme = themeServerHandler.getValue(req, token);
  themeServerHandler.setCookie(response, theme);

  // Применяем настройки уведомлений
  const notifications = notificationsServerHandler.getValue(req, token);
  notificationsServerHandler.setCookie(response, notifications);

  // Здесь можно будет добавить применение других настроек
}
