"use client";

import type { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";

export const HeaderWrapper = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  if (
    pathname.startsWith("/messages") ||
    pathname.startsWith("/appointments") ||
    pathname.startsWith("/profile/edit")
  ) {
    return null;
  }
  return <>{children}</>;
};
