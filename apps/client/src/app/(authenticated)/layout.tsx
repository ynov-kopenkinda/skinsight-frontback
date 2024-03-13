"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useUser } from "~/shared/hooks/useUser";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (user.isLoading) return;
    if (user.isError && pathname !== "/login") {
      router.push("/login");
    }
  }, [user, pathname, router]);

  if (user.isLoading) return null;
  if (user.isError) return null;
  return <>{children}</>;
}
