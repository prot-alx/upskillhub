import { MantineColorSchemeManager } from "@mantine/core";

function getCookieValue(name: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
}

export const customColorSchemeManager: MantineColorSchemeManager = {
  get: (defaultValue) => {
    if (typeof window === "undefined") {
      return defaultValue;
    }
    const cookieValue = getCookieValue("my-app-theme");
    console.log("Client theme from cookies:", cookieValue ?? defaultValue);
    return (cookieValue as "light" | "dark") || defaultValue;
  },
  set: (value) => {
    if (typeof window !== "undefined") {
      document.cookie = `my-app-theme=${value}; path=/; max-age=31536000`;
    }
  },
  subscribe: () => {},
  unsubscribe: () => {},
  clear: () => {
    if (typeof window !== "undefined") {
      document.cookie = "my-app-theme=; path=/; max-age=0";
    }
  },
};
