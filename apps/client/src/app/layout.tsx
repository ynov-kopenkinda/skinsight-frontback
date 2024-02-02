import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";
import "@radix-ui/themes/styles.css";

import { headers } from "next/headers";
import { Flex, Text, Theme } from "@radix-ui/themes";

import { auth } from "@skinsight/auth";

import { LoginButton } from "./auth";
import { TRPCReactProvider } from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function Layout(props: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={["font-sans", fontSans.variable].join(" ")}>
        <TRPCReactProvider headers={headers()}>
          <Theme appearance="dark">
            {session == null ? (
              <Flex align="center" justify="center" className="h-screen">
                <LoginButton provider="discord" />
              </Flex>
            ) : (
              props.children
            )}
          </Theme>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
