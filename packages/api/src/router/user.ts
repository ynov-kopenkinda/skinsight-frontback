import { z } from "zod";

import { updateUserSchema } from "../schemas/user.schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUserById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(({ input, ctx }) => {
      return ctx.nest.users.usersControllerGetUserById(input);
    }),

  updateUserById: publicProcedure
    .input(updateUserSchema)
    .mutation(({ input, ctx }) => {
      return ctx.nest.users.usersControllerUpdateUser(input);
    }),
});
