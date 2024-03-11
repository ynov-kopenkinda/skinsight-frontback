import { appointmentRouter } from "./router/appointment";
import { authRouter } from "./router/auth";
import { chatRouter } from "./router/chat";
import { chatEventRouter } from "./router/chat-event";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  chat: chatRouter,
  user: userRouter,
  appointment: appointmentRouter,
  chatEvent: chatEventRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
