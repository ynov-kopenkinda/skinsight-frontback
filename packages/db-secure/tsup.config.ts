import { defineConfig } from "tsup";

const isDev = process.env.npm_lifecycle_event === "dev";

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["index.ts"],
  format: ["esm", "cjs"],
  minify: !isDev,
  target: "esnext",
  outDir: "dist",
});
