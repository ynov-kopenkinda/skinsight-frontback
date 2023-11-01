import { sql } from "@kopenkinda/db";
import { items } from "@kopenkinda/db/schema/item";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const libraryRouter = createTRPCRouter({
  getItemsCount: protectedProcedure.query(async ({ ctx }) => {
    const [result] = await ctx.db
      .select({
        count: sql`COUNT(*)`,
      })
      .from(items)
      .execute();
    return (result?.count as number) ?? 0;
  }),
});
