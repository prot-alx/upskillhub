"use client";

import { useSession } from "next-auth/react";
import { Container, Text, Stack, Alert, Paper, Title } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import GoogleAuthButton from "@/features/auth/GoogleAuthButton";

export default function AuthPage() {
  const { status } = useSession();
  const [error, setError] = useState("");

  return (
    <Container size="sm" py="xl">
      <Paper shadow="md" p="xl" radius="md" withBorder>
        <Stack align="center">
          <Title order={2}>Войдите в систему</Title>
          {error && (
            <Alert
              color="red"
              title="Ошибка"
              withCloseButton
              onClose={() => setError("")}
            >
              {error}
            </Alert>
          )}
          {status === "loading" ? (
            <Text>Загрузка...</Text>
          ) : (
            <GoogleAuthButton
              isAuth={status}
              onError={setError}
              callbackUrl="/dashboard"
            />
          )}
          <Link href="/" style={{ marginTop: "20px" }} prefetch>
            <Text>На главную</Text>
          </Link>
        </Stack>
      </Paper>
    </Container>
  );
}
