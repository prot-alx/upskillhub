"use client";
import { Paper, Title, Text } from "@mantine/core";
import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {
  const { session, status } = useAuth();
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
