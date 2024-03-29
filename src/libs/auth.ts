import prisma from "@/libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import argon2 from "argon2";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

/**
 * Authentication options for NextAuth.
 * @type { NextAuthOptions }
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      id: "github",
      name: "Github",
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      id: "google",
      name: "Google",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Credentials");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email.toLowerCase(),
          },
        });
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid Credentials");
        }
        const isValidPassword = await argon2.verify(
          user.hashedPassword,
          credentials.password
        );
        if (!isValidPassword) {
          throw new Error("Invalid Credentials");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV !== "production",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_SECRET,
};
