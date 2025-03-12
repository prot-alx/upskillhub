// src/app/api/users/settings/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// Интерфейс для типизации обновлений настроек
interface SettingsUpdates {
  theme?: "light" | "dark";
  notifications?: boolean;
}

// GET запрос для получения настроек текущего пользователя
export async function GET() {
  try {
    // Получаем сессию через getServerSession с параметрами auth
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      console.log("Unauthorized: No user session found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    console.log(`Getting settings for user ${userId}`);

    // Ищем настройки пользователя
    const userSettings = await prisma.userSettings.findUnique({
      where: { userId },
    });

    if (!userSettings) {
      console.log(`Settings not found for user ${userId}`);
      return NextResponse.json(
        { error: "Settings not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(userSettings);
  } catch (error) {
    console.error("Error fetching user settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// PATCH запрос для обновления настроек
export async function PATCH(request: NextRequest) {
  try {
    // Получаем сессию через getServerSession с параметрами auth
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      console.log("Unauthorized: No user session found in PATCH");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const updates: SettingsUpdates = await request.json();

    console.log(`Updating settings for user ${userId}:`, updates);

    // Проверяем, что обновляются только разрешенные поля
    const validUpdates: SettingsUpdates = {};

    if (
      "theme" in updates &&
      (updates.theme === "light" || updates.theme === "dark")
    ) {
      validUpdates.theme = updates.theme;
    }

    if (
      "notifications" in updates &&
      typeof updates.notifications === "boolean"
    ) {
      validUpdates.notifications = updates.notifications;
    }

    // Если нет допустимых обновлений, возвращаем ошибку
    if (Object.keys(validUpdates).length === 0) {
      return NextResponse.json(
        { error: "No valid updates provided" },
        { status: 400 }
      );
    }

    // Обновляем настройки пользователя (создаем, если не существуют)
    const updatedSettings = await prisma.userSettings.upsert({
      where: { userId },
      update: validUpdates,
      create: {
        userId,
        // Явно преобразуем нетипизированные объекты в строго типизированные
        theme: validUpdates.theme ?? "light",
        notifications: validUpdates.notifications ?? true,
      },
    });

    console.log(
      `Successfully updated settings for user ${userId}:`,
      updatedSettings
    );
    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
