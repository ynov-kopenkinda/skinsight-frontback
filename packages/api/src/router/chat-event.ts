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
      return ctx.nest.chatEvent.chatEventControllerCreateChatEvent({
        requestBody: {
          chatEventType: "MESSAGE_SENT",
          chatId: input.chatId,
          data: input.data,
          userId: input.userId,
        },
      });
    }),

  getImageSendByUserId: publicProcedure
    .input(
      z.object({
        userId: z.number(),
      }),
    )
    .query(({ input, ctx }) => {
      return ctx.nest.chatEvent.chatEventControllerGetImagesFromUserId(input);
    }),
});
