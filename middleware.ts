import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("Запрос в middleware");
  const isAuth = req.cookies.get("next-auth.session-token");
  console.log("Найден токен:", isAuth);

  if (!isAuth && req.nextUrl.pathname.startsWith("/dashboard")) {
    console.log("Пользователь не авторизован! Редирект на /auth");
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
