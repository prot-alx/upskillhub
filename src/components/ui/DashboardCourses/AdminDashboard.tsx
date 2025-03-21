"use client";

import { Paper, Title, Text, Button } from "@mantine/core";

export const AdminDashboard = () => (
  <>
    <Title order={2} mb="lg">
      Управление курсами
    </Title>
    <Paper shadow="xs" p="md" withBorder mb="md">
      <Text mb="md">Панель управления курсами для администратора</Text>
      <Button variant="outline">Создать новый курс</Button>
    </Paper>
  </>
);
