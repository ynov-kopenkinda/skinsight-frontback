import { Card, Flex } from "@radix-ui/themes";

import { LogoutButton } from "~/app/auth";

export const AppHeader = () => {
  return (
    <Card>
      <Flex justify="end">
        <LogoutButton />
      </Flex>
    </Card>
  );
};
