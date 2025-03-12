import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Интерфейс для обновления пользователя
interface UserUpdate {
  name?: string;
  settings?: {
    theme?: "light" | "dark";
    notifications?: boolean;
  };
}

// Интерфейс для корректного обновления пользователя в Prisma
interface PrismaUserUpdate {
  name?: string;
  settings?: {
    upsert: {
      create: {
        theme: string;
        notifications: boolean;
      };
      update: {
        theme?: string;
        notifications?: boolean;
      };
    };
  };
}

// Получить пользователя по ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Проверка авторизации
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Проверка, что пользователь имеет доступ к этим данным
    // (может видеть только свой профиль или админ может видеть любой)
    if (session.user.id !== params.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }
    // Получаем пользователя с настройками
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: { settings: true },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// Обновить пользователя по ID
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Проверка авторизации
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Проверка, что пользователь имеет доступ к этим данным
    if (session.user.id !== params.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const data: UserUpdate = await request.json();

    // Разрешаем обновлять только определенные поля пользователя
    const allowedUpdates = ["name"] as const;
    type AllowedUpdateKey = (typeof allowedUpdates)[number];

    // Создаем типизированный объект для обновления
    const validUserUpdates: Record<string, string> = {};

    for (const key of allowedUpdates) {
      if (key in data) {
        validUserUpdates[key] = data[key as AllowedUpdateKey] as string;
      }
    }

    // Обрабатываем обновление настроек отдельно
    let settingsUpdate: PrismaUserUpdate["settings"] = undefined;

    if (data.settings) {
      const { theme, notifications } = data.settings;
      settingsUpdate = {
        upsert: {
          create: {
            theme: theme ?? "light",
            notifications: notifications ?? true,
          },
          update: {
            ...(theme && { theme }),
            ...(notifications !== undefined && { notifications }),
          },
        },
      };
    }

    // Обновляем пользователя и его настройки
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: {
        ...validUserUpdates,
        ...(settingsUpdate && { settings: settingsUpdate }),
      },
      include: { settings: true },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// Удалить пользователя по ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Проверка авторизации (только админ может удалять пользователей)
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }
    await prisma.user.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
