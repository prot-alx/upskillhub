import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  console.log("Запрос в middleware для URL:", req.nextUrl.pathname);

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const response = NextResponse.next();

  // Приоритет: 1) куки, 2) токен, 3) дефолт
  const getTheme = () => {    
    const cookieTheme = req.cookies.get("my-app-theme")?.value;
     
    if (cookieTheme) {
      return cookieTheme;
    }

    if (token?.settings?.theme) {
      return token.settings.theme;
    }

    return "light";
  };

  const theme = getTheme();

  // Устанавливаем тему в куки
  response.cookies.set("my-app-theme", theme, {
    path: "/",
    maxAge: 31536000, // 1 год
    httpOnly: false, // Чтобы JavaScript мог читать куки на клиенте
    sameSite: "lax",
  });

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
