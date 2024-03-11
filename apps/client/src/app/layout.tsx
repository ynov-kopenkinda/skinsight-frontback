import { Inter } from "next/font/google";

import "@radix-ui/themes/styles.css";
import "~/styles/globals.css";

import { headers } from "next/headers";
import { Theme } from "@radix-ui/themes";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

import { TRPCReactProvider } from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--default-font-family",
});

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={["font-sans", fontSans.variable].join(" ")}
        suppressHydrationWarning
      >
        <SessionProvider>
          <TRPCReactProvider headers={headers()}>
            <Theme appearance="light">
              <Toaster position="top-right" />
              {/* {session == null ? (
              <Flex align="center" justify="center" className="h-screen">
                <LoginButton provider="credentials" />
              </Flex>
            ) : ( */}
              {props.children}
              {/* )} */}
            </Theme>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
