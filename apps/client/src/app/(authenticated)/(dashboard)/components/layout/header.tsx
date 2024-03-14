"use client";

import { Avatar, Flex, Text } from "@radix-ui/themes";

import { useUser } from "~/shared/hooks/useUser";
import { api } from "~/utils/api/react";
import TapBar from "../TapBar";
import TopMenu from "../TopMenu";
import { HeaderWrapper } from "./header-wrapper";

export const AppHeader = () => {
  const user = useUser();
  const { data: userData } = api.user.getUserById.useQuery(
    { id: user.data!.id },
    { enabled: !!user.data?.id },
  );

  return (
    <HeaderWrapper>
      <div>
        <Flex justify="between" align="center" gap="3">
          <div className="flex items-center gap-x-2">
            <Avatar
              className="bg-red-50"
              radius="full"
              src={"https://api.dicebear.com/7.x/adventurer/svg?seed=Molly"}
              fallback={
                <>
                  {userData?.firstName
                    ? userData.firstName.slice(0, 2)
                    : "Logo"}
                </>
              }
              size="4"
            />
            <Text className="ml-2 font-bold">Hello, {userData?.firstName}</Text>
          </div>
          <div className="hidden sm:block">
            <TopMenu />
          </div>
          <div className="border-gray glassmorphism container fixed bottom-4 left-0 right-0 z-50 mx-auto block w-fit rounded-xl border-2 bg-white pl-4 pr-4">
            <TapBar />
          </div>
        </Flex>
      </div>
    </HeaderWrapper>
  );
};
