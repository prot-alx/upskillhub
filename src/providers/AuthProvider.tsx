"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({
  children,
}: Readonly<AuthProviderProps>) {
  return <SessionProvider>{children}</SessionProvider>;
}
