import { Role } from "@prisma/client";
/**
 * Интерфейс для мокового пользователя
 */
export interface MockUser {
  email: string;
  name: string;
  role: Role;
  description?: string; // Опциональное описание для удобства выбора при тестировании
}
/**
 * Список моковых пользователей для тестирования
 * НЕ ИСПОЛЬЗОВАТЬ В PRODUCTION
 */
export const MOCK_USERS: MockUser[] = [
  // Студенты
  {
    email: "mock-student1@example.com",
    name: "Иван Студентов",
    role: Role.USER,
    description: "Обычный студент",
  },
  {
    email: "mock-student2@example.com",
    name: "Мария Ученикова",
    role: Role.USER,
    description: "Студент с расширенными правами",
  },
  {
    email: "mock-student3@example.com",
    name: "Алексей Тестовый",
    role: Role.USER,
    description: "Новый студент без курсов",
  },
  // Новые студенты
  {
    email: "mock-student4@example.com",
    name: "Анна Степанова",
    role: Role.USER,
    description: "Студент с опытом программирования",
  },
  {
    email: "mock-student5@example.com",
    name: "Дмитрий Волков",
    role: Role.USER,
    description: "Студент-дизайнер",
  },
  {
    email: "mock-student6@example.com",
    name: "Екатерина Смирнова",
    role: Role.USER,
    description: "Студент с математическим образованием",
  },
  {
    email: "mock-student7@example.com",
    name: "Сергей Иванов",
    role: Role.USER,
    description: "Студент-переводчик",
  },
  {
    email: "mock-student8@example.com",
    name: "Татьяна Петрова",
    role: Role.USER,
    description: "Студент-маркетолог",
  },
  // Преподаватели
  {
    email: "mock-teacher1@example.com",
    name: "Ольга Преподавателева",
    role: Role.INSTRUCTOR,
    description: "Основной преподаватель",
  },
  {
    email: "mock-teacher2@example.com",
    name: "Петр Учителев",
    role: Role.INSTRUCTOR,
    description: "Преподаватель без активных курсов",
  },
  // Администраторы
  {
    email: "mock-admin@example.com",
    name: "Анна Админова",
    role: Role.ADMIN,
    description: "Главный администратор",
  },
  {
    email: "mock-moderator@example.com",
    name: "Максим Модераторов",
    role: Role.ADMIN,
    description: "Модератор контента",
  },
];
/**
 * Функция для получения моковых пользователей по роли
 */
export function getMockUsersByRole(role: Role): MockUser[] {
  return MOCK_USERS.filter((user) => user.role === role);
}
/**
 * Функция для получения мокового пользователя по email
 */
export function getMockUserByEmail(email: string): MockUser | undefined {
  return MOCK_USERS.find((user) => user.email === email);
}
/**
 * Функция для проверки, является ли email адресом мокового пользователя
 */
export function isMockUserEmail(email: string): boolean {
  return MOCK_USERS.some((user) => user.email === email);
}