"use client";

import { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";

export const HeaderWrapper = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  if (pathname.startsWith("/messages")) {
    return null;
  }
  return <>{children}</>;
};
