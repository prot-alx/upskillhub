"use client";

import { Paper, Title, Text, Grid, Card } from "@mantine/core";

export const AdminStatistics = () => (
  <>
    <Title order={2} mb="lg">
      Общая статистика
    </Title>
    <Paper shadow="xs" p="md" withBorder mb="md">
      <Text mb="md">Добро пожаловать в админ-панель</Text>
    </Paper>
    <Paper shadow="xs" p="md" withBorder>
      <Text mb="md">Статистика платформы</Text>
      <Grid>
        <Grid.Col span={4}>
          <Card shadow="sm" p="md">
            <Text>Всего курсов: 24</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card shadow="sm" p="md">
            <Text>Активных пользователей: 156</Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card shadow="sm" p="md">
            <Text>Преподавателей: 8</Text>
          </Card>
        </Grid.Col>
      </Grid>
    </Paper>
  </>
);
