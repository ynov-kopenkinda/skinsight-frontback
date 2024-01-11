import { Flex } from "@radix-ui/themes";

import Nav from "./components/Nav";
import HomeBanner from "./HomeBanner";

export default async function HomePage() {
  return (
    <Flex direction="column">
      <HomeBanner />
      <Nav />
    </Flex>
  );
}
