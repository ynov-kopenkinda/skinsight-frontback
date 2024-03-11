import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const chatEventRouter = createTRPCRouter({
  createChatEvent: publicProcedure
    .input(
      z.object({
        chatId: z.number(),
        userId: z.number(),
        data: z.string(),
      }),
    )
    .mutation(({ input, ctx }) => {
      ctx.nest.chatEvent.chatEventControllerCreateChatEvent({
        requestBody: {
          chatEventType: 1,
          chatId: input.chatId,
          data: input.data,
          userId: input.userId,
        },
      });
    }),
});
