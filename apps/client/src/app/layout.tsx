import { Inter } from "next/font/google";

import "@radix-ui/themes/styles.css";
import "~/styles/globals.css";

import { headers } from "next/headers";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "sonner";

import { auth } from "@skinsight/auth";

import { TRPCReactProvider } from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--default-font-family",
});

export default async function Layout(props: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={["font-sans", fontSans.variable].join(" ")}
        suppressHydrationWarning
      >
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
      </body>
    </html>
  );
}
