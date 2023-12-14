import React from "react";
import { Flex } from "@radix-ui/themes";

import { AppFooter } from "./components/layout/footer";
import { AppHeader } from "./components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex direction="column" p="2" gap="6" className="min-h-screen">
      <AppHeader />
      {children}
      <AppFooter className="mt-auto" />
    </Flex>
  );
}
