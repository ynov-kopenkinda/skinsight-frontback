import { Avatar, Flex, Text } from "@radix-ui/themes";

import { auth } from "@skinsight/auth";

import { LogoutButton } from "~/app/auth";
import TapBar from "../TapBar";
import TopMenu from "../TopMenu";
import { HeaderWrapper } from "./header-wrapper";

export const AppHeader = async () => {
  const session = await auth();

  // TMP: session?. => session. | session.user.name never null

  // if (!session) {
  //   return;
  // }

  return (
    <HeaderWrapper>
      <div>
        <Flex justify="between" align="center" gap="3">
          <div>
            <Avatar
              className="bg-red-50"
              radius="full"
              src={
                session?.user.image
                  ? session?.user.image
                  : "https://api.dicebear.com/7.x/adventurer/svg?seed=Molly"
              }
              fallback={
                <>
                  {session?.user.name
                    ? session?.user.name?.slice(0, 2)
                    : "Logo"}
                </>
              }
              size="4"
            />
            <Text className="font-bold">
              Hello, {session?.user.name ? session?.user.name : "Thomas"}
            </Text>
            <LogoutButton />
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
