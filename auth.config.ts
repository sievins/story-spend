import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      const isLoggedIn = !!auth?.user;
      return isLoggedIn;
    },
    // session and jwt are required so that the userId is returned
    // https://stackoverflow.com/a/71721634/4069599
    // https://github.com/nextauthjs/next-auth/discussions/536#discussioncomment-1863534
    session: async ({ session, token }) => {
      if (session?.user) {
        if (!token.sub) throw new Error("No sub");
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;
