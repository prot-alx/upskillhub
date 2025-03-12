// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Объявляем глобальный тип
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Используем глобальную переменную для предотвращения множественных экземпляров
// при разработке с горячей перезагрузкой
const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

// Не кешируем в продакшене
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
