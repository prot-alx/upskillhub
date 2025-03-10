"use client";
import { useAuth } from "@/hooks/useAuth";
import { Paper, Title, Text } from "@mantine/core";
import { Role } from "@prisma/client";

export default function DashboardCoursesPage() {
  const { session } = useAuth();

  const role = session?.user?.role;

  return (
    <div>
      {role === Role.ADMIN ? (
        <>
          <Title order={2} mb="lg">
            Управление курсами
          </Title>
          <Paper shadow="xs" p="md" withBorder>
            <Text>Панель управления курсами для администратора</Text>
          </Paper>
        </>
      ) : (
        <>
          <Title order={2} mb="lg">
            Мои курсы
          </Title>
          <Text>Курсы, на которые вы записаны</Text>
        </>
      )}
    </div>
  );
}
