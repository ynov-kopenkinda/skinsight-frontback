import { Avatar, Flex, Text } from "@radix-ui/themes";
import { auth } from "@skinsight/auth";

import { LogoutButton } from "~/app/auth";

export const AppHeader = async () => {
  const session = await auth();

  // TMP: session?. => session. | session.user.name never null

  // if (!session) {
  //   return;
  // }

  return (
    <div>
      <Flex align="center" gap="3">
      <Avatar
        className="bg-red-50"
        radius="full"
        src={session?.user.image ? session?.user.image : "https://api.dicebear.com/7.x/adventurer/svg?seed=Molly"}
        fallback={<>{session?.user.name ? session?.user.name?.slice(0, 2) : 'Logo'}</>}
        size="4"
      />
        <Text className="font-bold">Hello, {session?.user.name ? session?.user.name : 'Thomas'}</Text>
        <LogoutButton />
      </Flex>
    </div>
  );
};
