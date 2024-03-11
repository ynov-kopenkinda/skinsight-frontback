import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const appointmentRouter = createTRPCRouter({
  getAppointmentForUser: publicProcedure.input(z.object({
    id: z.number(),
  })).query(({ input, ctx }) => {
    return ctx.nest.appointments.appointmentControllerFindAllForUser(input)
  }),
})