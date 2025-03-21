"use client";

import { Paper, Title, Text, Grid, Card } from "@mantine/core";

export const UserStatistics = () => (
  <>
    <Title order={2} mb="lg">
      Общая статистика
    </Title>
    <Paper shadow="xs" p="md" withBorder mb="md">
      <Text mb="md">Добро пожаловать в панель учащегося</Text>
    </Paper>
    <Paper shadow="xs" p="md" withBorder>
      <Text mb="md">Моя статистика</Text>
      <Grid>
        <Grid.Col span={4}>
          <Card shadow="sm" p="md">
            <Text>Мои курсы: 3</Text>
          </Card>
        </Grid.Col>        
      </Grid>
    </Paper>
  </>
);
