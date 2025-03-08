import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  const logout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const requireAuth = (callback: () => void) => {
    if (status === "loading") return;
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
