import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const s3Router = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ key: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.nest.s3.s3ControllerGetSignedGetUrl({ s3Key: input.key });
    }),

  upload: publicProcedure
    .input(z.object({ userid: z.number() }))
    .mutation(({ input, ctx }) => {
      return ctx.nest.s3.s3ControllerGetSignedPostUrl({ userId: input.userid });
    }),
});
