import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/username",
  },
  session: {
    strategy: "database",
  },
  callbacks: {
    // async jwt({ token, user }) {
    //   if (user) {
    //     const fullUser = await prisma.user.findUnique({
    //       where: {
    //         id: user.id,
    //       },
    //     });

    //     if (fullUser) {
    //       token.username = fullUser.username;
    //     }
    //   }
    //   return token;
    // },
    async session({ session, user }) {
      if (session.user) {
        const fullUser = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
          include: {
            chatSessions: true,
          },
        });

        if (fullUser) {
          session.user.id = fullUser.id;
          session.user.username = fullUser.username;
        }
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
