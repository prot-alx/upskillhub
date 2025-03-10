"use client";

import { Paper, Title, Text } from "@mantine/core";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

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
