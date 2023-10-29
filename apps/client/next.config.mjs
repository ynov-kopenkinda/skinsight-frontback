// Importing env files here to validate on build
import "@kopenkinda/env";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@kopenkinda/api",
    "@kopenkinda/auth",
    "@kopenkinda/db",
    "@kopenkinda/env",
  ],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default config;
