import React from "react";
import { Flex } from "@radix-ui/themes";

import { AppHeader } from "./components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex direction="column" gap="6" className="min-h-screen pb-24 px-2">
      <AppHeader />
      {children}
    </Flex>
  );
}
