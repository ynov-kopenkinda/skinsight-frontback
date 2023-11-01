"use client";

import { Badge, Card, Flex, Grid, Tooltip } from "@radix-ui/themes";
import { IconSticker, IconSwitchHorizontal } from "@tabler/icons-react";

import { type RouterOutputs } from "~/utils/api/shared";

type IOffer = RouterOutputs["steam"]["getTradeoffers"]["received"][0];

export const Tradeoffer = ({ offer }: { offer: IOffer }) => {
  return (
    <Card>
      <Grid columns="3">
        <Side items={offer.itemsToGive} reverse />
        <Center offer={offer} />
        <Side items={offer.itemsToReceive} />
      </Grid>
    </Card>
  );
};

function Center({ offer }: { offer: IOffer }) {
  return (
    <Flex justify="center" align="center">
      {offer.message === "" ? (
        <IconSwitchHorizontal stroke={1.5} size={16} />
      ) : (
        <Tooltip content={offer.message}>
          <IconSwitchHorizontal stroke={1.5} size={16} />
        </Tooltip>
      )}
    </Flex>
  );
}

function Side({
  username = "Unknown",
  reverse = false,
  items,
}: {
  username?: string;
  reverse?: boolean;
  items: IOffer["itemsToGive"];
}) {
  return (
    <Flex direction={reverse ? "row-reverse" : "row"}>
      <Tooltip content={username}>
        <Badge color={reverse ? "red" : "green"}>
          {items.length} <IconSticker stroke={1.5} size={16} />
        </Badge>
      </Tooltip>
    </Flex>
  );
}
