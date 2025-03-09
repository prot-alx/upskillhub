"use client";
import { useSession } from "next-auth/react";
import { Container, Text, Stack, Alert, Paper, Title } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GoogleLoginLogoutButton from "@/features/auth/GoogleLoginLogoutButton";

export default function AuthPage() {
  const { status } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (status === "authenticated") {
    router.push("/dashboard");
    return null;
  }

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
            <GoogleLoginLogoutButton
              isAuth={status}
              onError={setError}
              onLoadingChange={setIsLoading}
              callbackUrl="/dashboard"
            />
          )}

          <Link href="/" style={{ marginTop: "20px" }}>
            <Text>На главную</Text>
          </Link>
        </Stack>
      </Paper>
    </Container>
  );
}
