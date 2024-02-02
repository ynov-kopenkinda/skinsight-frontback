import { Inter } from "next/font/google";

import "@radix-ui/themes/styles.css";
import "~/styles/globals.css";

import { headers } from "next/headers";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "sonner";

import { auth } from "@skinsight/auth";

import { TRPCReactProvider } from "./providers";
import { SessionProvider } from "./session-provider";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--inter-font",
});

export default async function Layout(props: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={[fontSans.variable].join(" ")}>
        <TRPCReactProvider headers={headers()}>
          <SessionProvider auth={session}>
            <Theme appearance="light">
              <Toaster position="top-right" />
              {props.children}
            </Theme>
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
