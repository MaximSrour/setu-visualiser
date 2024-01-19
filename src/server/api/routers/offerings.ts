import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const offeringRouter = createTRPCRouter({
  getAllOfferings: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.offerings.findMany();
  }),
});
