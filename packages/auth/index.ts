/* eslint-disable @typescript-eslint/unbound-method */
/* @see https://github.com/nextauthjs/next-auth/pull/8932 */

import Discord from "@auth/core/providers/discord";
import type { DefaultSession } from "@auth/core/types";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

import { db, sql, tableCreator } from "@kopenkinda/db";
import { users } from "@kopenkinda/db/schema/auth";

export type { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      authorized: boolean;
    } & DefaultSession["user"];
  }
}

export type Providers = "discord";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db, tableCreator),
  providers: [Discord],
  callbacks: {
    session: async ({ session, user }) => {
      const [dbUser] = await db
        .select({
          authorized: users.authorized,
        })
        .from(users)
        .where(sql`id = ${user.id}`)
        .limit(1)
        .execute();

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          authorized: dbUser?.authorized ?? false,
        },
      };
    },
  },
});
