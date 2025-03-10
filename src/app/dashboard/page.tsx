"use client";
import { Title, Paper, Text } from "@mantine/core";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@prisma/client";

export default function DashboardPage() {
  const { session } = useAuth();

  const role = session?.user?.role;

  return (
    <div>
      {role === Role.ADMIN ? (
        <>
          <Title order={2} mb="lg">
            Общая статистика
          </Title>
          <Paper shadow="xs" p="md" withBorder>
            <Text>Добро пожаловать в админ-панель</Text>
          </Paper>
        </>
      ) : (
        <>
          <Title order={2} mb="lg">
            Моя статистика
          </Title>
          <Paper shadow="xs" p="md" withBorder>
            <Text>Статистика всех моих курсов</Text>
          </Paper>
        </>
      )}
    </div>
  );
}
