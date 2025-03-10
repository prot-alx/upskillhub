import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  console.log("Запрос в middleware для URL:", req.nextUrl.pathname);
  console.log("MIDDLEWARE LOADED", new Date().toISOString());
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    console.log("Статус токена:", token ? "Валидный" : "Отсутствует");

    // Защищенные маршруты, требующие авторизации
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      if (!token) {
        console.log("Пользователь не авторизован! Редирект на главную");
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Перенаправить авторизованных пользователей с /auth на /dashboard
    if (req.nextUrl.pathname === "/auth") {
      if (token) {
        console.log("Пользователь уже авторизован! Редирект в dashboard");
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    // Если нет перенаправлений, продолжаем обработку запроса
    const response = NextResponse.next();

    // Установка куки для темы
    const theme =
      token?.settings?.theme ||
      req.cookies.get("my-app-theme")?.value ||
      "light";
    console.log("Тема для SSR:", theme);
    response.cookies.set("my-app-theme", theme, {
      path: "/",
      maxAge: 31536000,
    });

    return response;
  } catch (error) {
    console.error("Ошибка в middleware:", error);
    // В случае ошибки, лучше пропустить запрос, чем блокировать доступ
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/auth"],
};
