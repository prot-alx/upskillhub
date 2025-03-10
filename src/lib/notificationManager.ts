function getCookieValue(name: string): string | undefined {
  if (typeof window === "undefined") return undefined;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
}

export const notificationManager = {
  get: (defaultValue = true): boolean => {
    if (typeof window === "undefined") {
      return defaultValue;
    }

    const cookieValue = getCookieValue("my-app-notifications");
    console.log(
      "Client notifications from cookies:",
      cookieValue ?? defaultValue
    );

    if (cookieValue === "true") return true;
    if (cookieValue === "false") return false;
    return defaultValue;
  },

  set: (value: boolean): void => {
    if (typeof window !== "undefined") {
      document.cookie = `my-app-notifications=${value}; path=/; max-age=31536000`;
    }
  },

  clear: (): void => {
    if (typeof window !== "undefined") {
      document.cookie = "my-app-notifications=; path=/; max-age=0";
    }
  },
};
