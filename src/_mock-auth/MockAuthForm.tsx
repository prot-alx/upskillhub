"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { MOCK_USERS } from "./mock-users-config";
import { Button, Paper, Title, Text, Group, Avatar, Badge } from "@mantine/core";
import { Role } from "@prisma/client";

// Функция для отображения названия роли на русском языке
const getRoleName = (role: string): string => {
  switch (role) {
    case Role.ADMIN:
      return "Администратор";
    case Role.INSTRUCTOR:
      return "Преподаватель";
    case Role.USER:
      return "Студент";
    default:
      return "Неизвестная роль";
  }
};

// Функция для получения цвета бейджа по роли
const getRoleColor = (role: string): string => {
  switch (role) {
    case Role.ADMIN:
      return "red";
    case Role.INSTRUCTOR:
      return "blue";
    case Role.USER:
      return "green";
    default:
      return "gray";
  }
};

export default function MockAuthForm() {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  useEffect(() => {
    // Устанавливаем первого пользователя по умолчанию при загрузке компонента
    if (MOCK_USERS.length > 0 && !selectedEmail) {
      setSelectedEmail(MOCK_USERS[0].email);
    }
  }, [selectedEmail]);

  const handleMockLogin = async () => {
    if (!selectedEmail) return;
    
    await signIn("mock-credentials", {
      email: selectedEmail,
      callbackUrl: "/dashboard",
    });
  };

  // Если не в режиме разработки, скрываем компонент
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <Paper shadow="md" p="md" withBorder>
      <Title order={3} mb="md">
        Тестовая авторизация
      </Title>
      <Text size="sm" mb="lg">
        Выберите мокового пользователя для входа в систему (только для разработки)
      </Text>

      <Group mb="md">
        {MOCK_USERS.map((user) => (
          <Button
            key={user.email}
            variant={selectedEmail === user.email ? "filled" : "outline"}
            onClick={() => setSelectedEmail(user.email)}
            leftSection={
              <Avatar 
                size="sm" 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
              />
            }
            rightSection={
              <Badge color={getRoleColor(user.role)}>{getRoleName(user.role)}</Badge>
            }
            fullWidth
          >
            {user.name}
          </Button>
        ))}
      </Group>

      <Button 
        onClick={handleMockLogin} 
        fullWidth 
        disabled={!selectedEmail}
      >
        Войти как тестовый пользователь
      </Button>
    </Paper>
  );
}