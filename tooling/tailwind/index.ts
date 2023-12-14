import type { Config } from "tailwindcss";

import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [""],
  theme: {
    extend: {
      colors: {
        'primary': '#5861E2',
        'secondary': '#D1F6DB',
        'gray': '#F2F2F7'
      },
      fontFamily: {
        'sans': ['"Inter"', ...defaultTheme.fontFamily.sans],
        'inter': ['"Inter"', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
} satisfies Config;
