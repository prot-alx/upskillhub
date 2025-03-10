import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Ошибка при входе:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  const requireAuth = (callback: () => void) => {
    if (status === "loading") {
      return;
    }

    if (!session) {
      router.push("/auth");
      return;
    }

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
