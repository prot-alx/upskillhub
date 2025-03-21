import { Role } from "@prisma/client";
import type { AuthOptions } from "next-auth";

type NextAuthConfig = AuthOptions;

declare module "next-auth" {
  interface User {
    id: string;
    role?: Role;
  }

  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: Role;
      settings?: {
        theme: "light" | "dark";
        notifications: boolean;
        [key: string]: unknown; // Для будущих настроек
      };
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken?: string;
    role?: Role;
    settings?: {
      theme: "light" | "dark";
      notifications: boolean;
      [key: string]: unknown;
    };
  }
}
