"use client";
import { Paper, Title, Text } from "@mantine/core";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { session } = useAuth();

  return (
    <div>
      <Title order={2} mb="lg">
        Профиль пользователя
      </Title>
      <Paper shadow="xs" p="md" withBorder>
        <Text>Имя: {session?.user?.name}</Text>
        <Text>Email: {session?.user?.email}</Text>
      </Paper>
    </div>
  );
}
