import { createEnv } from "@t3-oss/env-nextjs";
import * as dotenv from "dotenv";
import { z } from "zod";

if (process.env.DATABASE_URL === undefined) {
  dotenv.config({
    path: "../../.env",
  });
}

export const env = createEnv({
  client: {},
  server: {
    AUTH_DISCORD_ID: z.string().min(1),
    AUTH_DISCORD_SECRET: z.string().min(1),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string().min(1)
        : z.string().min(1).optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTNEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url(),
    ),
    DATABASE_URL: z.string().url(),
    DATABASE_PREFIX: z.string().default(""),
    STEAM_BOT_PORT: z.coerce.number().default(3001),
    STEAM_BOT_BASEURL: z.string().url(),
    STEAM_BOT_AUTHTOKEN: z.string(),
    STEAM_ACCOUNT_NAME: z.string(),
    STEAM_ACCOUNT_PWD: z.string(),
    STEAM_ACCOUNT_SHARED_SECRET: z.string(),
  },
  shared: {
    VERCEL_URL: z
      .string()
      .optional()
      .transform((v) => (v ? `https://${v}` : undefined)),
    PORT: z.coerce.number().default(3000),
  },
  runtimeEnv: {
    AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID,
    AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    VERCEL_URL: process.env.VERCEL_URL,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_PREFIX: process.env.DATABASE_PREFIX,
    STEAM_BOT_BASEURL: process.env.STEAM_BOT_BASEURL,
    STEAM_BOT_PORT: process.env.STEAM_BOT_PORT,
    STEAM_BOT_AUTHTOKEN: process.env.STEAM_BOT_AUTHTOKEN,
    STEAM_ACCOUNT_NAME: process.env.STEAM_ACCOUNT_NAME,
    STEAM_ACCOUNT_PWD: process.env.STEAM_ACCOUNT_PWD,
    STEAM_ACCOUNT_SHARED_SECRET: process.env.STEAM_ACCOUNT_SHARED_SECRET,
  },
  skipValidation:
    !!process.env.CI ||
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",
});
