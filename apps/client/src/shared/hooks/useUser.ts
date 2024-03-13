import { useSession } from "@skinsight/auth";

export const useUser: () => {
  data:
    | {
        id: number;
        role: string;
        name: string;
      }
    | undefined;
  isLoading: boolean;
  isError: boolean;
} = () => {
  const session = useSession();
  return {
    data:
      session.data?.user !== undefined
        ? {
            ...session.data?.user,
            name: session.data?.user?.name ?? "",
          }
        : undefined,
    isLoading: session.status === "loading",
    isError: session.status === "unauthenticated",
  };
};
