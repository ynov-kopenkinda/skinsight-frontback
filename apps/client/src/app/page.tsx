import { Flex } from "@radix-ui/themes";

import { AuthShowcase } from "./auth";

export default async function HomePage() {
  return (
    <div className="container mx-auto">
      <Flex direction="column" gap="2" py="4">
        <AuthShowcase />
      </Flex>
    </div>
  );
}
