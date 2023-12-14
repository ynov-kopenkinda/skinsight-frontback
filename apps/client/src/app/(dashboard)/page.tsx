import { Card, Flex } from "@radix-ui/themes";
import HomeBanner from "./HomeBanner";

export default async function HomePage() {
  return (
    <Flex direction="column">
      <HomeBanner />
    </Flex>
  );
}
