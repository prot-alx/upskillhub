import { Provider } from "next-auth/providers/index";
import { MOCK_USERS } from "./mock-users-config";

/**
 * @fileoverview Провайдер аутентификации для моковых пользователей
 * Используется только в режиме разработки
 */

/**
 * Провайдер аутентификации для моковых пользователей
 * Используется только в development окружении
 */
export default function MockAuthProvider(): Provider {
  return {
    id: "mock-credentials",
    name: "Mock User",
    type: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
    },
    authorize: async (credentials) => {
      if (!credentials?.email) {
        return null;
      }

      // Находим мокового пользователя по email
      const mockUser = MOCK_USERS.find(
        (user) => user.email === credentials.email
      );

      if (!mockUser) {
        return null;
      }

      // Возвращаем данные пользователя в формате, совместимом с NextAuth
      return {
        id: `mock-${mockUser.email}`, // Префикс для идентификации моковых пользователей
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
        // Изображение по умолчанию для моковых пользователей
        image: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          mockUser.name
        )}&background=random`,
      };
    },
  };
}
