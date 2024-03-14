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
  acceptAppointment: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        appointmentId: z.number(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.nest.appointments.appointmentControllerAcceptAppointment(
        input,
      );
    }),
  declineAppointment: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        appointmentId: z.number(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.nest.appointments.appointmentControllerDeclineAppointment(
        input,
      );
    }),
});
