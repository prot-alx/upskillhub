"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Профиль пользователя</h1>
      <div>
        <p>Имя: {session?.user?.name}</p>
        <p>Email: {session?.user?.email}</p>
      </div>
    </div>
  );
}
