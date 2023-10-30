import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";
import "@radix-ui/themes/styles.css";

import { headers } from "next/headers";
import { Theme } from "@radix-ui/themes";

import { TRPCReactProvider } from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Starter repo",
  description: "Simple monorepo with shared backend for web",
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={["font-sans", fontSans.variable].join(" ")}>
        <TRPCReactProvider headers={headers()}>
          <Theme appearance="dark">{props.children}</Theme>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
