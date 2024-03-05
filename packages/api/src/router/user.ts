import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUserById: publicProcedure.input(z.object({
    id: z.number(),
  })).query(({ input, ctx }) => {
    return ctx.nest.users.usersControllerGetUserById(input)
  })
})
