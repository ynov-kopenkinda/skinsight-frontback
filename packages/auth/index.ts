/* eslint-disable @typescript-eslint/unbound-method */
/* @see https://github.com/nextauthjs/next-auth/pull/8932 */

import type { DefaultSession } from "@auth/core/types";
import { jwtDecode } from "jwt-decode";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { useSession as _useSession } from "next-auth/react";

export type { Session } from "next-auth";

type NextSessionUser = DefaultSession["user"] & {
  id: number;
  role: string;
};

declare module "next-auth" {
  interface Session {
    user: NextSessionUser;
  }
}

export type Providers = "credentials";

export const useSession = _useSession;

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
        const res = await fetch("http://localhost:3001/auth/signin", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) return null;
        if (res.status == 401) return null;
        const tokens = (await res.json()) as {
          accessToken: string;
          refreshToken: string;
        };
        const userDecoded = jwtDecode<{
          id: number;
          email: string;
          role: string;
          iat: number;
          exp: number;
        }>(tokens.accessToken);
        const user: NextSessionUser = {
          id: userDecoded.id as never,
          role: userDecoded.role,
          name: userDecoded.email,
        };
        return user;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token, user }) => {
      // console.log("callbacks.session", { session, token, user });
      return {
        ...session,
        user: {
          ...session.user,
        },
      };
    },
  },
});
