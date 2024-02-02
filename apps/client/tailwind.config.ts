import type { Config } from "tailwindcss";

import baseConfig from "@skinsight/tailwind-config";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#5861E2',
        'secondary': '#D1F6DB',
        'gray': '#F2F2F7',
        'gray-strong': '#8A8A8E',
        'green': '#B9D8C1',
      },
    },
  },
  presets: [baseConfig],
} satisfies Config;
