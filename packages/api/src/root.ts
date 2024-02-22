import { authRouter } from "./router/auth";
import { chatRouter } from "./router/chat";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  chat: chatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
