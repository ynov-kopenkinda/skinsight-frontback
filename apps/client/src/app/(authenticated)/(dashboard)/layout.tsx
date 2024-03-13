import React from "react";
import { Flex } from "@radix-ui/themes";

import { AppHeader } from "./components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex
      direction="column"
      gap="6"
      className="min-h-screen overflow-hidden px-4 pb-24 pt-2 md:px-16 lg:px-20"
    >
      <AppHeader />
      {children}
    </Flex>
  );
}
