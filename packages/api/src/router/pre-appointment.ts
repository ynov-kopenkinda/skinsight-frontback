import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const preAppointmentRouter = createTRPCRouter({
  createPreAppointment: publicProcedure
    .input(
      z.object({
        message: z.string(),
        doctorId: z.number(),
        patientId: z.number(),
        image: z.string(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.nest.preAppointments.preAppointmentControllerCreate({
        requestBody: {
          message: input.message,
          doctorId: input.doctorId,
          patientId: input.patientId,
          image: input.image,
        },
      });
    }),
});
