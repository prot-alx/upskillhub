import { NextRequest, NextResponse } from "next/server";
import { JWT } from "next-auth/jwt";
import { Theme, THEME_COOKIE_NAME, DEFAULT_THEME } from "./types";

// Получает значение темы из запроса или токена на сервере
export function getServerThemeValue(
  req: NextRequest,
  token?: JWT | null
): Theme {
  const cookieValue = req.cookies.get(THEME_COOKIE_NAME)?.value as
    | Theme
    | undefined;

  if (cookieValue) {
    return cookieValue;
  }

  if (token?.settings?.theme) {
    return token.settings.theme as Theme;
  }

  return DEFAULT_THEME;
}

// Устанавливает cookie с темой в ответ на сервере
export function setServerThemeCookie(
  response: NextResponse,
  value: Theme
): void {
  response.cookies.set(THEME_COOKIE_NAME, value, {
    path: "/",
    maxAge: 31536000, // 1 год
    httpOnly: false, // Чтобы JavaScript мог читать куки на клиенте
    sameSite: "lax",
  });
}

export const themeServerHandler = {
  cookieName: THEME_COOKIE_NAME,
  defaultValue: DEFAULT_THEME,
  tokenKey: "theme" as const,
  getValue: getServerThemeValue,
  setCookie: setServerThemeCookie,
};
