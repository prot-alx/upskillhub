"use client";
import { useState } from "react";
import { Button } from "@mantine/core";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IconLogin, IconLogout } from "@tabler/icons-react";

type GoogleSignInButtonProps = {
  callbackUrl?: string;
  isAuth?: "authenticated" | "loading" | "unauthenticated";
  onError?: (error: string) => void;
  onLoadingChange?: (isLoading: boolean) => void;
};

export default function GoogleAuthButton({
  callbackUrl = "/dashboard",
  isAuth,
  onError,
  onLoadingChange,
}: Readonly<GoogleSignInButtonProps>) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    onLoadingChange?.(true);
    try {
      await signIn("google", { callbackUrl });
    } catch (err) {
      console.error("Ошибка при авторизации:", err);
      onError?.("Произошла ошибка при авторизации через Google.");
      setIsLoading(false);
      onLoadingChange?.(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut({ redirect: false });
      router.push("/");
    } catch (err) {
      console.error("Ошибка при выходе:", err);
      onError?.("Произошла ошибка при выходе из системы.");
    } finally {
      setIsLoading(false);
      onLoadingChange?.(false);
    }
  };
  
  return (
    <>
      {isAuth === "authenticated" ? (
        <Button
          onClick={handleSignOut}
          loading={isLoading}
          color="red"
          variant="light"
          leftSection={<IconLogout size={18} />}
          visibleFrom="sm"
        >
          Выйти
        </Button>
      ) : (
        <Button
          onClick={handleGoogleSignIn}
          loading={isLoading}
          color="blue"
          leftSection={<IconLogin size={18} />}
          visibleFrom="sm"
        >
          Войти через Google
        </Button>
      )}
      {/* Мобильные версии кнопок (только иконки) */}
      {isAuth === "authenticated" ? (
        <Button
          onClick={handleSignOut}
          loading={isLoading}
          color="red"
          variant="light"
          hiddenFrom="sm"
        >
          <IconLogout size={18} />
        </Button>
      ) : (
        <Button
          onClick={handleGoogleSignIn}
          loading={isLoading}
          color="blue"
          hiddenFrom="sm"
        >
          <IconLogin size={18} />
        </Button>
      )}
    </>
  );
}
