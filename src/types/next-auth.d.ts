import type { AuthOptions } from "next-auth";

type NextAuthConfig = AuthOptions;

declare module "next-auth" {
  interface User {
    id: string;
  }

  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      settings?: {
        theme: "light" | "dark";
        [key: string]: unknown; // Для будущих настроек
      };
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken?: string;
    settings?: {
      theme: "light" | "dark";
      [key: string]: unknown;
    };
  }
}
