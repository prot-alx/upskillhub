import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

if (!process.env.NEXTAUTH_SECRET) {
  console.warn("Предупреждение: переменная NEXTAUTH_SECRET не определена");
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  pages: {
    signIn: "/auth", // URL страницы входа
    error: "/auth", // URL для отображения ошибок аутентификации
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        if (token.sub) {
          token.id = token.sub;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        if (token.id) {
          session.user.id = token.id;
        } else if (token.sub) {
          session.user.id = token.sub;
        } else {
          session.user.id = "temp-id";
        }

        if (token.accessToken) {
          session.accessToken = token.accessToken;
        }
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 дней
  },

  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
