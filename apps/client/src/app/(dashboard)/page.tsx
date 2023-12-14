import { Flex } from "@radix-ui/themes";
import HomeBanner from "./HomeBanner";
import Nav from "./components/Nav";

export default async function HomePage() {
  return (
    <Flex direction="column">
      <HomeBanner />
      <Nav />
    </Flex>
  );
}
