// Получает значение cookie по имени
export function getCookieValue(name: string): string | undefined {
  if (typeof window === "undefined") return undefined;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }

  return undefined;
}

// Устанавливает cookie с указанным именем и значением
export function setCookie(
  name: string,
  value: string,
  maxAge = 31536000
): void {
  if (typeof window !== "undefined") {
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
  }
}

// Удаляет cookie с указанным именем
export function clearCookie(name: string): void {
  if (typeof window !== "undefined") {
    document.cookie = `${name}=; path=/; max-age=0`;
  }
}

// Логирует значение настройки на клиенте
export function logClientSetting(type: string, value: unknown): void {
  console.log(`Client ${type} from cookies:`, value);
}
