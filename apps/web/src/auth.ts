import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { username: true, country: true, role: true },
        });

        session.user.id = user.id;
        session.user.username = dbUser?.username;
        session.user.country = dbUser?.country;
        session.user.role = dbUser?.role;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/onboarding",
  },
});
