"use client";

import { Paper, Title, Text, Grid, Card } from "@mantine/core";

export const InstructorStatistics = () => (
  <>
    <Title order={2} mb="lg">
    Общая статистика
    </Title>
    <Paper shadow="xs" p="md" withBorder mb="md">
      <Text mb="md">Добро пожаловать в панель преподавателя</Text>
    </Paper>
    <Paper shadow="xs" p="md" withBorder>
      <Text mb="md">Моя статистика</Text>
      <Grid>
        <Grid.Col span={4}>
          <Card shadow="sm" p="md">
            <Text>Мои курсы: 12</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card shadow="sm" p="md">
            <Text>Моих учеников: 34</Text>
          </Card>
        </Grid.Col>
      </Grid>
    </Paper>
  </>
);
