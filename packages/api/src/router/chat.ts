import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const chatRouter = createTRPCRouter({
  getChatsByUserId: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(({ input, ctx }) => {
      return ctx.nest.chat.chatControllerGetChatByUserId(input);
    }),
  getChatEventByChatId: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(({ input, ctx }) => {
      return ctx.nest.chat.chatControllerGetChat(input);
    }),
});
