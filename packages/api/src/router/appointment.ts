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

  createAppointment: publicProcedure
    .input(
      z.object({
        doctorId: z.number(),
        patientId: z.number(),
        date: z.string(),
        location: z.string(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.nest.appointments.appointmentControllerCreate({
        requestBody: input,
      });
    }),

  checkIfAppointmentExists: publicProcedure
    .input(
      z.object({
        doctorId: z.number(),
        patientId: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const data =
        await ctx.nest.appointments.appointmentControllerCheckIfAppointmentExists(
          input,
        );
      console.log(data);
      return data;
    }),
});
