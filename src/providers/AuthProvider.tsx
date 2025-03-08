"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({
  children,
}: Readonly<AuthProviderProps>) {
  return <SessionProvider>{children}</SessionProvider>;
}
