"use client";

import type { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";

export const HeaderWrapper = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  if (pathname.startsWith("/messages") || pathname.startsWith("/appointments")) {
    return null;
  }
  return <>{children}</>;
};
