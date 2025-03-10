import { Title, Paper, Text } from "@mantine/core";

export default function DashboardPage() {
  const isAdmin = true;

  return (
    <div>
      {isAdmin ? (
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
