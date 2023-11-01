"use client";

import { useState } from "react";
import {
  Box,
  Callout,
  Card,
  Flex,
  IconButton,
  ScrollArea,
  Select,
  Text,
} from "@radix-ui/themes";
import {
  IconAlertCircle,
  IconRefresh,
  IconRefreshDot,
  IconRefreshOff,
} from "@tabler/icons-react";
import { useIsClient, useLocalStorage } from "usehooks-ts";

import { api } from "~/utils/api/react";
import { Tradeoffer } from "./tradeoffer";

export type RefetchInterval = 1 | 2 | 5 | 10 | 15;

export const Tradeoffers = () => {
  const [autoreaload, setAutoreaload] = useState(false);
  const [refetchInterval, setRefetchInterval] =
    useLocalStorage<RefetchInterval>("tradeoffers-autoreload-interval", 5);
  const onClient = useIsClient();

  const {
    data: tradeoffers,
    isFetching,
    error,
  } = api.steam.getTradeoffers.useQuery(undefined, {
    enabled: autoreaload,
    refetchInterval: refetchInterval * 1000 * 60,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const loading = isFetching;

  return (
    <Card className="row-span-2">
      <Flex direction="column" py="2" gap="2">
        <Flex justify="between">
          <Text>Tradeoffers</Text>
          {onClient && (
            <Flex gap="1">
              {autoreaload && (
                <Select.Root
                  defaultValue={refetchInterval.toString()}
                  value={refetchInterval.toString()}
                  onValueChange={(value: `${RefetchInterval}`) =>
                    setRefetchInterval(parseInt(value) as RefetchInterval)
                  }
                >
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Item value="1">1m</Select.Item>
                    <Select.Item value="2">2m</Select.Item>
                    <Select.Item value="5">5m</Select.Item>
                    <Select.Item value="10">10m</Select.Item>
                    <Select.Item value="15">15m</Select.Item>
                  </Select.Content>
                </Select.Root>
              )}
              <IconButton
                color={autoreaload ? "green" : "red"}
                variant="surface"
                onClick={() => setAutoreaload((current) => !current)}
              >
                {autoreaload ? (
                  <IconRefresh stroke={1.5} size={18} />
                ) : (
                  <IconRefreshOff stroke={1.5} size={18} />
                )}
              </IconButton>
            </Flex>
          )}
        </Flex>
        {onClient && (
          <Box position="relative" className="h-52">
            {(!autoreaload || loading) && (
              <Flex
                className="absolute inset-0 z-10 rounded-md bg-black/80 backdrop-blur-sm"
                justify="center"
                align="center"
              >
                {loading ? (
                  <IconRefreshDot
                    stroke={1.5}
                    className="animate-spin [animation-direction:reverse]"
                  />
                ) : (
                  <IconRefreshOff stroke={1.5} />
                )}
              </Flex>
            )}
            <ScrollArea>
              <Flex direction="column" gap="1">
                {error && (
                  <Callout.Root color="red">
                    <Callout.Icon>
                      <IconAlertCircle stroke={1.5} size={16} />
                    </Callout.Icon>
                    <Callout.Text>{error.message}</Callout.Text>
                  </Callout.Root>
                )}
                {tradeoffers?.sent?.map((tradeoffer) => (
                  <Tradeoffer key={tradeoffer.id} offer={tradeoffer} />
                ))}
              </Flex>
            </ScrollArea>
          </Box>
        )}
      </Flex>
    </Card>
  );
};
