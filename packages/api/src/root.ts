import { authRouter } from "./router/auth";
import { libraryRouter } from "./router/library";
import { steamRouter } from "./router/steam";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  library: libraryRouter,
  steam: steamRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
