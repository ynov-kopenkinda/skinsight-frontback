import { Button, Card, Flex, Grid, Text } from "@radix-ui/themes";
import { IconArrowRight } from "@tabler/icons-react";

import { api } from "~/utils/api/server";
import { Tradeoffers } from "./tradeoffers";

const ItemsCount = async () => {
  const result = await api.library.getItemsCount.query();
  const inner = (
    <>
      Go to library <IconArrowRight stroke={1.5} />
    </>
  );

  return (
    <Card>
      <Flex direction="column" py="2">
        <Text>Tracking</Text>
        <Text size="8" weight="bold">
          {result}
          <Text size="3" weight="regular">
            {" "}
            items
          </Text>
        </Text>
        <Button mt="2" disabled={true}>
          {inner}
        </Button>
      </Flex>
    </Card>
  );
};

const PortfolioProgression = () => {
  return (
    <Card className="col-span-2 row-span-2">
      <Flex direction="column" py="2">
        <Text>Portfolio progression</Text>
      </Flex>
    </Card>
  );
};

const LastUpdate = () => {
  return (
    <Card>
      <Flex direction="column" py="2">
        <Text>Last updated</Text>
        <Text size="8" weight="bold">
          15
          <Text size="3" weight="regular">
            {" "}
            min ago
          </Text>
        </Text>
      </Flex>
    </Card>
  );
};

export const Statistics = () => {
  return (
    <Grid gap="2" columns="4" rows="2">
      <PortfolioProgression />
      <ItemsCount />
      <Tradeoffers />
      <LastUpdate />
    </Grid>
  );
};
