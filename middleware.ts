import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  console.log("Запрос в middleware");

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("Статус токена:", token ? "Валидный" : "Отсутствует");

  // Защищенные маршруты - редирект неавторизованных пользователей
  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    console.log("Пользователь не авторизован! Редирект на главную");
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Страница аутентификации - редирект авторизованных пользователей
  if (token && req.nextUrl.pathname === "/auth") {
    console.log("Пользователь уже авторизован! Редирект в dashboard");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/switch-account", "/auth"],
};
