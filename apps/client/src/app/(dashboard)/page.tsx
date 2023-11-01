import { Flex } from "@radix-ui/themes";

import { Statistics } from "./components/statistics";

export default async function HomePage() {
  return (
    <Flex direction="column">
      <Statistics />
    </Flex>
  );
}
