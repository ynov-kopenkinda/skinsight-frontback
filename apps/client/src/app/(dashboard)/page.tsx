import { Flex } from "@radix-ui/themes";

import Nav from "./components/Nav";
import HomeBanner from "./components/HomeBanner";
import RecommandedDoctor from "./components/RecommandedDoctor";

export default async function HomePage() {
  return (
    <Flex direction="column">
      <HomeBanner />
      <Nav />
      <RecommandedDoctor />
    </Flex>
  );
}
