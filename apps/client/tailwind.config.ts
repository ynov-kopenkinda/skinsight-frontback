import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

import baseConfig from "@skinsight/tailwind-config";

const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: "#5861E2",
        secondary: "#D1F6DB",
        gray: "#F2F2F7",
      },
      fontFamily: {
        sans: ["var(--inter-font)", ...defaultTheme.fontFamily.sans].join(" "),
      },
    },
  },
  content: ["./src/**/*.{ts,tsx}"],
  presets: [baseConfig],
};

export default config;
