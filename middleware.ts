import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  console.log("Запрос в middleware");

  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  console.log("Статус токена:", token ? "Валидный" : "Отсутствует");

  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    console.log("Пользователь не авторизован! Редирект на главную");
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/switch-account"],
};
