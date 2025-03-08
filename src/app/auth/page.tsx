"use client";
import { signIn, useSession } from "next-auth/react";
import {
  Button,
  Container,
  Text,
  Stack,
  Alert,
  Paper,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthPage() {
  const { status } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");

    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (err) {
      console.error("Ошибка при авторизации:", err);
      setError("Произошла ошибка при авторизации через Google.");
      setIsLoading(false);
    }
  };

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
            <Button
              size="lg"
              color="blue"
              onClick={handleGoogleSignIn}
              loading={isLoading}
              fullWidth
            >
              Войти через Google
            </Button>
          )}

          <Link href="/" style={{ marginTop: "20px" }}>
            <Text>На главную</Text>
          </Link>
        </Stack>
      </Paper>
    </Container>
  );
}
