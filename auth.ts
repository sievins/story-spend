import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/db";
import authConfig from "@/auth-config";

export const {
  handlers: { GET, POST },
  auth,
  signOut,
} = NextAuth({
  // There is a type error bug in next-auth: https://github.com/nextauthjs/next-auth/issues/6106
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
