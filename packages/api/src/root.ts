import { appointmentRouter } from "./router/appointment";
import { authRouter } from "./router/auth";
import { chatRouter } from "./router/chat";
import { chatEventRouter } from "./router/chat-event";
import { preAppointmentRouter } from "./router/pre-appointment";
import { s3Router } from "./router/s3";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  chat: chatRouter,
  user: userRouter,
  appointment: appointmentRouter,
  chatEvent: chatEventRouter,
  preAppointment: preAppointmentRouter,
  s3: s3Router,
});

// export type definition of API
export type AppRouter = typeof appRouter;
