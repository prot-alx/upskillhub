import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Логирование для отладки
  useEffect(() => {
    console.log("useAuth hook: статус =", status, "сессия =", !!session);
  }, [status, session]);

  const login = async () => {
    console.log("Запуск процесса входа через Google");
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Ошибка при входе:", error);
    }
  };

  const logout = async () => {
    console.log("Запуск процесса выхода");
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  const requireAuth = (callback: () => void) => {
    if (status === "loading") {
      console.log("requireAuth: статус загрузки, ожидание");
      return;
    }

    if (!session) {
      console.log("requireAuth: нет сессии, перенаправление на /auth");
      router.push("/auth");
      return;
    }

    console.log("requireAuth: сессия существует, выполнение callback");
    callback();
  };

  return {
    session,
    status,
    isAuthenticated: !!session,
    isLoading: status === "loading",
    login,
    logout,
    requireAuth,
  };
}
