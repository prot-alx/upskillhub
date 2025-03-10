import { Paper, Title, Text } from "@mantine/core";

export default function CoursesPage() {
  return (
    <div>
      <Title order={2} mb="lg">
        Каталог курсов
      </Title>
      <Paper shadow="xs" p="md" withBorder>
        <Text>Здесь представлены все доступные курсы</Text>
      </Paper>
    </div>
  );
}
