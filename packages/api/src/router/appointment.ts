import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const appointmentRouter = createTRPCRouter({
  getAppointmentForPatient: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(({ input, ctx }) => {
      return ctx.nest.appointments.appointmentControllerFindAllForPatient(
        input,
      );
    }),
  getAppointmentForDoctor: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(({ input, ctx }) => {
      return ctx.nest.appointments.appointmentControllerFindAllForDoctor(input);
    }),
});
