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
  variable: "--inter-font",
});

export default async function Layout(props: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={[fontSans.variable].join(" ")}>
        <TRPCReactProvider headers={headers()}>
          <Theme appearance="light">
            <Toaster position="top-right" />
            <div className={["h-12 w-12", "bg-red-400"].join(" ")}>Hi</div>
            {props.children}
          </Theme>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
