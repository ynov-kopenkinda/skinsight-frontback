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
    API_SERVER_BASEURL: z.string().url(),
    API_SERVER_PORT: z.coerce.number().default(3001),
    API_SERVER_TOKEN: z.string().min(12),
  },
  shared: {
    VERCEL_URL: z
      .string()
      .optional()
      .transform((v) => (v ? `https://${v}` : undefined)),
    PORT: z.coerce.number().default(3000),
  },
  runtimeEnv: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    VERCEL_URL: process.env.VERCEL_URL,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_PREFIX: process.env.DATABASE_PREFIX,
    API_SERVER_BASEURL: process.env.API_SERVER_BASEURL,
    API_SERVER_PORT: process.env.API_SERVER_PORT,
    API_SERVER_TOKEN: process.env.API_SERVER_TOKEN,
  },
  skipValidation:
    !!process.env.CI ||
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",
});
