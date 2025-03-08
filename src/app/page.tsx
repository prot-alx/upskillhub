"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

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

      <nav>
        <ul>
          <li>
            <Link href="/courses">Каталог курсов</Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link href="/dashboard">Личный кабинет</Link>
              </li>
              <li>
                <button onClick={() => signOut({ callbackUrl: "/" })}>
                  Выйти
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/auth">Авторизация</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
