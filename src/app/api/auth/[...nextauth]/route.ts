import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { $Enums, PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id ?? token.sub ?? "temp-id";
        token.settings = token.settings || {
          theme: "light",
          notifications: true,
        };

        let existingUser = await prisma.user.findUnique({
          where: { email: token.email ?? "" },
        });

        if (!existingUser) {
          existingUser = await prisma.user.create({
            data: {
              email: token.email ?? "",
              name: token.name ?? "",
              role: Role.USER,
            },
          });
        }

        token.role = existingUser?.role || $Enums.Role.USER;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.accessToken = token.accessToken;
        session.user.settings = token.settings;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
