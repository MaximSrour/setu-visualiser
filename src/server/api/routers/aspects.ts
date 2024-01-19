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
    return await ctx.db.query.aspectData.findMany({
      where: ((aspectData, { and, eq }) => and(
        eq(aspectData.unit, input.unit),
        eq(aspectData.year, input.year),
        eq(aspectData.semester, input.semester),
        eq(aspectData.campus, input.campus),
        eq(aspectData.aspectType, input.aspectType))
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
    return await ctx.db.query.aspectData.findMany({
      where: ((aspectData, { and, eq }) => and(
        eq(aspectData.unit, input.unit),
        eq(aspectData.campus, input.campus),
        eq(aspectData.aspectType, input.aspectType),
        eq(aspectData.aspect, input.aspect))
      ),
      orderBy: (aspectData, { asc }) => [
        asc(aspectData.year),
        asc(aspectData.semester)
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
    return await ctx.db.query.aspectData.findMany({
      where: ((aspectData, { and, eq }) => and(
        eq(aspectData.unit, input.unit),
        eq(aspectData.campus, input.campus))
      ),
      orderBy: (aspectData, { asc }) => [
        asc(aspectData.year),
        asc(aspectData.semester)
      ],
      with: {
        aspectDefinition: true,
      },
    });
  }),
});
