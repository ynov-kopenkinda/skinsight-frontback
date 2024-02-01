import { Avatar, Flex, Text } from "@radix-ui/themes";
import { auth } from "@skinsight/auth";
import { IconCamera, IconSearch } from "@tabler/icons-react";
import Link from "next/link";

import { LogoutButton } from "~/app/auth";
import TopMenu from "../TopMenu";
import TapBar from "../TapBar";

export const AppHeader = async () => {
  const session = await auth();

  // TMP: session?. => session. | session.user.name never null

  // if (!session) {
  //   return;
  // }

  return (
    <div>
      <Flex justify='between' align="center" gap="3">
        <div>
          <Avatar
            className="bg-red-50"
            radius="full"
            src={session?.user.image ? session?.user.image : "https://api.dicebear.com/7.x/adventurer/svg?seed=Molly"}
            fallback={<>{session?.user.name ? session?.user.name?.slice(0, 2) : 'Logo'}</>}
            size="4"
          />
            <Text className="font-bold">Hello, {session?.user.name ? session?.user.name : 'Thomas'}</Text>
            <LogoutButton />
          </div>
          <div className="hidden sm:block">
            <TopMenu />
          </div>
          <div className="block sm:hidden bottom-2 fixed left-0 right-0 w-[96%] container mx-auto bg-white rounded-xl border-gray border-2 z-50 glassmorphism">
            <TapBar />
          </div>
      </Flex>
    </div>
  );
};
