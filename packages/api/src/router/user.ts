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

  getDoctors: publicProcedure.query(({ ctx }) => {
    return ctx.nest.users.usersControllerGetDoctors();
  }),

  updateUserById: publicProcedure
    .input(updateUserSchema)
    .mutation(({ input, ctx }) => {
      return ctx.nest.users.usersControllerUpdateUser(input);
    }),

  deleteUserById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.nest.users.usersControllerDeleteUser(input);
    }),
});
