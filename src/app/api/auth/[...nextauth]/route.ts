// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Добавляем токен доступа при первоначальной авторизации
      if (account && user) {
        token.accessToken = account.access_token;
      }

      // Если у токена есть email, найдем или создадим пользователя
      if (token.email) {
        try {
          // Ищем пользователя по email
          let dbUser = await prisma.user.findUnique({
            where: { email: token.email },
            include: { settings: true },
          });

          // Если пользователь не найден, создаем его
          if (!dbUser) {
            console.log(`Создаем нового пользователя с email: ${token.email}`);

            dbUser = await prisma.user.create({
              data: {
                email: token.email,
                name: token.name ?? "",
                role: Role.USER,
              },
              include: { settings: true },
            });
          }

          // Важно! Используем ID из базы данных
          token.id = dbUser.id;
          token.role = dbUser.role;

          // Если у пользователя есть настройки, добавляем их в токен
          if (dbUser.settings) {
            token.settings = {
              theme: dbUser.settings.theme as "light" | "dark",
              notifications: dbUser.settings.notifications,
            };
          } else {
            // Настройки по умолчанию
            token.settings = {
              theme: "light",
              notifications: true,
            };
          }

          console.log(`JWT обновлен с ID из БД: ${token.id}`);
        } catch (error) {
          console.error(
            "Ошибка при получении/создании пользователя в JWT callback:",
            error
          );
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        // Копируем данные из токена в сессию
        session.user.id = token.id;
        session.accessToken = token.accessToken;
        session.user.settings = token.settings;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 дней
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
