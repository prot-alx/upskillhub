import { JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Интерфейс для всех пользовательских настроек
export interface UserSettings {
  theme: "light" | "dark";
  notifications: boolean;
  // Будущие настройки можно добавить здесь
}

// Базовый интерфейс для клиентских менеджеров
export interface ClientSettingManager<T> {
  get: (defaultValue?: T) => T;
  set: (value: T) => void;
  clear: () => void;
}

// Интерфейс для серверных обработчиков настроек
export interface ServerSettingHandler<T> {
  cookieName: string;
  defaultValue: T;
  tokenKey: keyof UserSettings;
  getValue: (req: NextRequest, token?: JWT | null) => T;
  setCookie: (response: NextResponse, value: T) => void;
}
