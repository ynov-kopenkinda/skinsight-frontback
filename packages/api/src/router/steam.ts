import { createTRPCRouter, protectedProcedure } from "../trpc";

export const steamRouter = createTRPCRouter({
  getTradeoffers: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.steam.steamApiControllerOffers();
    return result;
  }),
});
