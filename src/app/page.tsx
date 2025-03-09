"use client";

import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <div>
      <h1>Главная страница</h1>
      <p>Добро пожаловать на сайт курсов</p>

      {isAuthenticated && (
        <p>Привет, {session?.user?.name ?? "пользователь"}!</p>
      )}      
    </div>
  );
}
