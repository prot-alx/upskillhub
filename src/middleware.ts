import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { applyAllSettings } from "./lib/settings";

export async function middleware(req: NextRequest) {
  console.log("Запрос в middleware для URL:", req.nextUrl.pathname);

  // Получаем JWT токен пользователя
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const response = NextResponse.next();

  // Применяем все настройки пользователя к ответу
  applyAllSettings(req, response, token);

  // Обработка редиректов для аутентификации
  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (token && req.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/auth"],
};
