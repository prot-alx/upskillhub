"use client";

import { Paper, Title, Text, Button } from "@mantine/core";

export const InstructorDashboard = () => (
  <>
    <Title order={2} mb="lg">
      Мои курсы (преподаватель)
    </Title>
    <Paper shadow="xs" p="md" withBorder mb="md">
      <Text mb="md">Курсы, которые вы ведете</Text>
      <Button variant="outline">Создать новый курс</Button>
    </Paper>
    <Paper shadow="xs" p="md" withBorder>
      <Text>У вас пока нет активных курсов</Text>
    </Paper>
  </>
);
