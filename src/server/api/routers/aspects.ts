import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const aspectRouter = createTRPCRouter({
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
      with: {
        aspectDefinition: true,
      },
    });
  }),

  getAspectOverTime: publicProcedure
  .input(z.object({
    unit: z.string(),
    campus: z.string(),
    aspectType: z.string(),
    aspect: z.number(),
  }))
  .query(async ({ ctx, input }) => {
    return await ctx.db.query.data.findMany({
      where: ((data, { and, eq }) => and(
        eq(data.unit, input.unit),
        eq(data.campus, input.campus),
        eq(data.aspectType, input.aspectType),
        eq(data.aspect, input.aspect))
      ),
      orderBy: (data, { asc }) => [
        asc(data.year),
        asc(data.semester)
      ],
      with: {
        aspectDefinition: true,
      },
    });
  }),

  getAspectsOverTime: publicProcedure
  .input(z.object({
    unit: z.string(),
    campus: z.string(),
  }))
  .query(async ({ ctx, input }) => {
    return await ctx.db.query.data.findMany({
      where: ((data, { and, eq }) => and(
        eq(data.unit, input.unit),
        eq(data.campus, input.campus))
      ),
      orderBy: (data, { asc }) => [
        asc(data.year),
        asc(data.semester)
      ],
      with: {
        aspectDefinition: true,
      },
    });
  }),
});
