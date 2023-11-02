import { Avatar, Button, Flex, IconButton } from "@radix-ui/themes";
import { IconLogout } from "@tabler/icons-react";

import { auth, Providers, signIn, signOut } from "@skinsight/auth";

export async function LoginButton({ provider }: { provider: Providers }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <Button>Sign in with Discord</Button>
    </form>
  );
}

export async function LogoutButton() {
  const session = await auth();
  if (!session) return null;
  return (
    <Flex align="center" gap="2">
      <Avatar
        src={session.user.image ?? ""}
        fallback={<>{session.user.name?.slice(0, 2)}</>}
        size="2"
      />
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <IconButton color="red">
          <IconLogout stroke={1.5} />
        </IconButton>
      </form>
    </Flex>
  );
}
