"use client";

import { useSession } from "next-auth/react";
import { Paper, Title, Text } from "@mantine/core";

export default function HomePage() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <div>
      <Title order={2} mb="lg">
        Главная страница
      </Title>
      <Paper shadow="xs" p="md" withBorder>
        <Text>Добро пожаловать на сайт курсов</Text>
        {isAuthenticated && (
          <Text>Привет, {session?.user?.name ?? "пользователь"}!</Text>
        )}
      </Paper>
    </div>
  );
}
