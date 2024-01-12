import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { data } from "~/server/db/schema";

import { and, eq } from 'drizzle-orm'

export const aspectRouter = createTRPCRouter({
  getFirst: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.data.findFirst();
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.data.findMany();
  }),


  getOffering: publicProcedure
  .input(z.object({
    unit: z.string(),
    year: z.number(),
    semester: z.string(),
    campus: z.string(),
    aspectType: z.string(),
  }))
  .query(async ({ ctx, input }) => {
    return await ctx.db.query.data.findMany({
      where: ((data, { and, eq }) => and(
        eq(data.unit, input.unit),
        eq(data.year, input.year),
        eq(data.semester, input.semester),
        eq(data.campus, input.campus),
        eq(data.aspectType, input.aspectType))
      ),
    });
  }),
});
