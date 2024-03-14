/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "skinsight-ynov-dk.s3.eu-west-3.amazonaws.com",
        port: "",
      },
    ],
    dangerouslyAllowSVG: true,
  },
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@skinsight/api",
    "@skinsight/auth",
    "@skinsight/database",
  ],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default config;
