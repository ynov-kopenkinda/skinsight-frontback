"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { IconLoader, IconLoader2 } from "@tabler/icons-react";

import { Session } from "@skinsight/auth";

export const sessionContext = createContext<Session | null>(null);

export const SessionProvider = ({
  children,
  auth,
}: {
  children: ReactNode;
  auth: Session | null;
}) => {
  const router = useRouter();
  const path = usePathname();

  const valid = useMemo(() => {
    return auth || path.startsWith("/auth");
  }, [auth, path]);

  useEffect(() => {
    if (!valid) {
      router.push("/auth/login");
    }
  }, [valid]);

  if (valid) {
    return (
      <sessionContext.Provider value={auth}>{children}</sessionContext.Provider>
    );
  }
  if (!path.startsWith("/auth")) {
    return (
      <div className="grid h-screen w-screen place-items-center">
        <IconLoader2 className="mx-auto my-auto h-10 w-10 animate-spin" />
      </div>
    );
  }
  return <>{children}</>;
};

export const useSession = () => {
  const ctx = useContext(sessionContext);
  if (ctx === null) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return ctx;
};
