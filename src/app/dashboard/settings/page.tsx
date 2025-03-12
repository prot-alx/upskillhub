"use client";
import { useEffect, useState } from "react";
import {
  Title,
  Card,
  Group,
  Stack,
  Text,
  Divider,
  Button,
  Alert,
} from "@mantine/core";
import { IconCheck, IconRefresh, IconAlertCircle } from "@tabler/icons-react";
import { useSettings } from "@/hooks/useSettings";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import NotificationSwitcher from "@/components/ui/NotificationSwitcher";

export default function SettingsPage() {
  const { isSettingsLoaded, hasSyncError, syncSettings } = useSettings();
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");

  // Сбрасываем статус сохранения через 3 секунды после успешного сохранения
  useEffect(() => {
    if (saveStatus === "success") {
      const timer = setTimeout(() => {
        setSaveStatus("idle");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  // Функция для ручного сохранения/синхронизации настроек
  const handleSaveSettings = async () => {
    setSaveStatus("saving");
    try {
      await syncSettings();
      setSaveStatus("success");
    } catch (error) {
      console.error("Ошибка при сохранении настроек:", error);
      setSaveStatus("error");
    }
  };

  // Получаем текст кнопки в зависимости от статуса
  const getButtonText = () => {
    switch (saveStatus) {
      case "success":
        return "Сохранено!";
      case "error":
        return "Ошибка!";
      default:
        return "Синхронизировать настройки";
    }
  };

  // Получаем цвет кнопки в зависимости от статуса
  const getButtonColor = () => {
    switch (saveStatus) {
      case "success":
        return "green";
      case "error":
        return "red";
      default:
        return "blue";
    }
  };

  // Определяем иконку для кнопки
  const buttonIcon =
    saveStatus === "success" ? <IconCheck size={16} /> : undefined;

  // Если настройки еще не загружены, показываем плейсхолдер
  if (!isSettingsLoaded) {
    return (
      <div>
        <Title order={2} mb="md">
          Настройки
        </Title>
        <Card withBorder p="xl" radius="md">
          <Text>Загрузка настроек...</Text>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Title order={2} mb="md">
        Настройки
      </Title>

      {/* Предупреждение о проблемах с синхронизацией */}
      {hasSyncError && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Проблема с синхронизацией"
          color="red"
          mb="md"
          withCloseButton={false}
        >
          Возникла проблема при сохранении ваших настроек на сервере. Изменения
          применены локально, но могут быть потеряны при перезагрузке страницы.
          Нажмите на кнопку ниже, чтобы повторить попытку сохранения.
          <Button
            leftSection={<IconRefresh size={16} />}
            variant="outline"
            color="red"
            size="xs"
            onClick={handleSaveSettings}
            loading={saveStatus === "saving"}
            mt="sm"
          >
            Повторить синхронизацию
          </Button>
        </Alert>
      )}

      <Card withBorder p="xl" radius="md">
        <Stack>
          <Title order={3}>Внешний вид</Title>
          <Group align="center">
            <Text>Тема интерфейса</Text>
            <ThemeSwitcher />
          </Group>

          <Divider my="sm" />

          <Title order={3}>Уведомления</Title>
          <NotificationSwitcher />
          <Text size="sm" c="dimmed">
            Включение или отключение уведомлений от платформы.
          </Text>

          <Divider my="sm" />

          <Group mt="lg" justify="flex-end">
            <Button
              onClick={handleSaveSettings}
              loading={saveStatus === "saving"}
              leftSection={buttonIcon}
              color={getButtonColor()}
            >
              {getButtonText()}
            </Button>
          </Group>
        </Stack>
      </Card>
    </div>
  );
}
