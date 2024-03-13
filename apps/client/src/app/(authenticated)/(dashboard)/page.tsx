import { Flex } from "@radix-ui/themes";

import HomeBanner from "./components/HomeBanner";
import Nav from "./components/Nav";
import RecommandedDoctor from "./components/RecommandedDoctor";

export default function HomePage() {
  return (
    <Flex direction="column">
      <HomeBanner />
      <Nav />
      <RecommandedDoctor />
    </Flex>
  );
}
