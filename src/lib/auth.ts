import { JWT } from "next-auth/jwt";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import { Role, User, UserSettings as PrismaUserSettings } from "@prisma/client";
import MockAuthProvider from "@/_mock-auth/MockAuthProvider";

interface TokenUserSettings {
  theme: "light" | "dark";
  notifications: boolean;
  [key: string]: unknown;
}

type UserWithSettings = User & {
  settings: PrismaUserSettings | null;
};

const DEFAULT_SETTINGS: TokenUserSettings = {
  theme: "light",
  notifications: true,
};

/**
 * Находит пользователя по email или создает нового
 */
async function findOrCreateUserByEmail(
  email: string,
  name?: string | null
): Promise<UserWithSettings | null> {
  let dbUser = await prisma.user.findUnique({
    where: { email },
    include: { settings: true },
  });

  // Если пользователь не найден, создаем его
  if (!dbUser) {
    console.log(`Создаем нового пользователя с email: ${email}`);
    dbUser = await prisma.user.create({
      data: {
        email,
        name: name ?? "",
        role: Role.USER,
        settings: {
          create: {
            theme: "light",
            notifications: true,
          },
        },
      },
      include: { settings: true },
    });
  }

  return dbUser;
}

/**
 * Создает настройки для пользователя, если их еще нет
 */
async function ensureUserSettings(
  userId: string
): Promise<UserWithSettings | null> {
  console.log(`Создаем настройки для пользователя с ID: ${userId}`);
  await prisma.userSettings.create({
    data: {
      userId,
      theme: "light",
      notifications: true,
    },
  });

  return prisma.user.findUnique({
    where: { id: userId },
    include: { settings: true },
  });
}

/**
 * Обновляет JWT токен настройками пользователя
 */
function updateTokenWithUserSettings(
  token: JWT,
  dbUser: UserWithSettings
): void {
  token.id = dbUser.id;
  token.role = dbUser.role;

  if (dbUser.settings) {
    token.settings = {
      theme: dbUser.settings.theme as "light" | "dark",
      notifications: dbUser.settings.notifications,
    };
  } else {
    token.settings = DEFAULT_SETTINGS;
  }

  console.log(
    `JWT обновлен с ID из БД: ${token.id} и настройками: ${JSON.stringify(
      token.settings
    )}`
  );
}

export const authOptions: NextAuthOptions = {
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
    // ДОБАВИТЬ МОКОВЫЙ ПРОВАЙДЕР
    ...(process.env.NODE_ENV !== "production" ? [MockAuthProvider()] : []),
    // Потом удалить ^^^
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // ДОБАВЛЕНО: Обработка моковых пользователей
      if (account && user) {
        token.accessToken = account.access_token;

        // Обработка моковых пользователей
        if (user.id && user.id.startsWith("mock-") && user.email) {
          token.id = user.id;
          token.role = user.role;
          token.settings = DEFAULT_SETTINGS;

          // Проверяем, существует ли пользователь уже в базе
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email },
            include: { settings: true },
          });

          // Если пользователь уже существует в базе, используем его данные
          if (dbUser) {
            updateTokenWithUserSettings(token, dbUser);
          }

          return token;
        }
      }
      // КОНЕЦ ДОБАВЛЕНИЯ

      if (token.email) {
        try {
          let dbUser = await findOrCreateUserByEmail(token.email, token.name);
          if (dbUser && !dbUser.settings) {
            const updatedUser = await ensureUserSettings(dbUser.id);
            if (updatedUser) {
              dbUser = updatedUser;
            }
          }
          if (dbUser) {
            updateTokenWithUserSettings(token, dbUser);
          } else {
            console.warn(
              `Не удалось найти или создать пользователя для email: ${token.email}`
            );
            token.settings = DEFAULT_SETTINGS;
          }
        } catch (error) {
          console.error(
            "Ошибка при получении/создании пользователя в JWT callback:",
            error
          );
          token.settings = DEFAULT_SETTINGS;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.accessToken = token.accessToken;
        session.user.settings = token.settings;
        session.user.role = token.role;
      }
      return session;
    },
  },
  // callbacks: {
  //   async jwt({ token, account, user }) {
  //     if (account && user) {
  //       token.accessToken = account.access_token;
  //     }

  //     if (token.email) {
  //       try {
  //         let dbUser = await findOrCreateUserByEmail(token.email, token.name);

  //         if (dbUser && !dbUser.settings) {
  //           const updatedUser = await ensureUserSettings(dbUser.id);

  //           if (updatedUser) {
  //             dbUser = updatedUser;
  //           }
  //         }

  //         if (dbUser) {
  //           updateTokenWithUserSettings(token, dbUser);
  //         } else {
  //           console.warn(
  //             `Не удалось найти или создать пользователя для email: ${token.email}`
  //           );
  //           token.settings = DEFAULT_SETTINGS;
  //         }
  //       } catch (error) {
  //         console.error(
  //           "Ошибка при получении/создании пользователя в JWT callback:",
  //           error
  //         );
  //         token.settings = DEFAULT_SETTINGS;
  //       }
  //     }

  //     return token;
  //   },

  //   async session({ session, token }) {
  //     if (session.user) {
  //       session.user.id = token.id;
  //       session.accessToken = token.accessToken;
  //       session.user.settings = token.settings;
  //       session.user.role = token.role;
  //     }
  //     return session;
  //   },
  // },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 дней
  },
  debug: process.env.NODE_ENV === "development",
};
