import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  console.log("Запрос в middleware");

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("Статус токена:", token ? "Валидный" : "Отсутствует");

  const response = NextResponse.next();

  const theme =
    token?.settings?.theme || req.cookies.get("my-app-theme")?.value || "light";
  console.log("Тема для SSR:", theme);
  response.cookies.set("my-app-theme", theme, {
    path: "/",
    maxAge: 31536000,
  });

  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    console.log("Пользователь не авторизован! Редирект на главную");
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (token && req.nextUrl.pathname === "/auth") {
    console.log("Пользователь уже авторизован! Редирект в dashboard");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/switch-account", "/auth"],
};
