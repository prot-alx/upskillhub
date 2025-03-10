import { Paper, Title, Text } from "@mantine/core";

export default function DashboardCoursesPage() {
  const isAdmin = true;

  return (
    <div>
      {isAdmin ? (
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
