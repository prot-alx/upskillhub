"use client";

import { Paper, Title, Text, Button } from "@mantine/core";
import Link from "next/link";

export const InstructorDashboard = () => (
  <>
    <Title order={2} mb="lg">
      Мои курсы (преподаватель)
    </Title>
    <Paper shadow="xs" p="md" withBorder mb="md">
      <Text mb="md">Курсы, которые вы ведете</Text>
      <Link href="courses/create">
        <Button variant="outline">Создать новый курс</Button>
      </Link>
    </Paper>
    <Paper shadow="xs" p="md" withBorder>
      <Text>У вас пока нет активных курсов</Text>
    </Paper>
  </>
);
