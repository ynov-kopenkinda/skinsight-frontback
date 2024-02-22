/* eslint-disable @typescript-eslint/unbound-method */
/* @see https://github.com/nextauthjs/next-auth/pull/8932 */

import type { DefaultSession } from "@auth/core/types";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export type { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export type Providers = "credentials";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email...",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) return null;
        const { email, password } = credentials;
        const res = await fetch('http://localhost:3001/auth/signin', {
          method: 'POST',
          body: JSON.stringify({
            email,
            password
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status == 401) return null;

        const user = await res.json();

        return user;
      }
    }),
  ],
  callbacks: {
    session: ({ session, token, user }) => {
      console.log({ session, token ,user })
      return {
        ...session,
        user: {
          ...session.user,
        },
      };
    },
  },
});
