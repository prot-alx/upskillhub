"use client";

import { Paper, Title, Text } from "@mantine/core";

export const UserDashboard = () => (
  <>
    <Title order={2} mb="lg">
      Мои курсы (ученик)
    </Title>
    <Text mb="md">Курсы, на которые вы записаны</Text>
    <Paper shadow="xs" p="md" withBorder>
      <Text>У вас пока нет активных курсов</Text>
    </Paper>
  </>
);
