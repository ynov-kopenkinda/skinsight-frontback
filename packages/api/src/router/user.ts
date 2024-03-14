import { z } from "zod";

import { updateUserSchema } from "../schemas/user.schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  registerUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        phone: z.string(),
        heightInCm: z.number(),
        weightInKg: z.number(),
        ssn: z.string(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.nest.users.usersControllerCreateUser({ requestBody: input });
    }),
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
