import { Avatar, Button, Card, Flex, Text } from "@radix-ui/themes";

import { auth, signIn, signOut } from "@kopenkinda/auth";

export async function AuthShowcase() {
  const session = await auth();

  if (!session) {
    return (
      <Card>
        <form
          action={async () => {
            "use server";
            await signIn("discord");
          }}
        >
          <Button>Sign in with Discord</Button>
        </form>
      </Card>
    );
  }

  return (
    <Card>
      {session && (
        <Flex align="center" gap="2" mb="2">
          <Avatar
            src={session.user.image ?? ""}
            fallback={<>{session.user.name?.slice(0, 2)}</>}
          />
          <Text>Logged in as {session.user.name}</Text>
        </Flex>
      )}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button color="red">Sign out</Button>
      </form>
    </Card>
  );
}
