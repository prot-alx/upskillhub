"use client";

import { useState } from "react";
import { Button } from "@mantine/core";
import { signIn, signOut } from "next-auth/react";

type GoogleSignInButtonProps = {
  callbackUrl?: string;
  isAuth?: 'authenticated' | 'loading' | 'unauthenticated';
  onError?: (error: string) => void;
  onLoadingChange?: (isLoading: boolean) => void;
};

export default function GoogleLoginLogoutButton({
  callbackUrl = "/dashboard",
  isAuth,
  onError,
  onLoadingChange,
}: Readonly<GoogleSignInButtonProps>) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    onLoadingChange?.(true);

    try {
      await signOut({ redirect: false });
      await signIn("google", { callbackUrl });
    } catch (err) {
      console.error("Ошибка при авторизации:", err);
      onError?.("Произошла ошибка при авторизации через Google.");
      setIsLoading(false);
      onLoadingChange?.(false);
    }
  };

  return (
    <>
      {isAuth === "authenticated" ? (
        <Button onClick={() => signOut({ callbackUrl: "/" })}>Выйти</Button>
      ) : (
        <Button
          onClick={handleGoogleSignIn}
          loading={isLoading}
        >
          Войти через Google
        </Button>
      )}
    </>
  );
}
