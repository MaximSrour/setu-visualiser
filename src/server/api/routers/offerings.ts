import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { offerings } from "~/server/db/schema";

import { eq, like, and, or, not } from "drizzle-orm";

export const offeringRouter = createTRPCRouter({
	getAll: publicProcedure
		.input(
			z.object({
				search: z.string().optional(),
				limit: z.number(),
				offset: z.number(),
			}),
		)
		.query(async ({ ctx, input }) => {
			return await ctx.db
				.selectDistinct({
					unit: offerings.unit,
					title: offerings.title,
					year: offerings.year,
					semester: offerings.semester,
					campus: offerings.campus,
					mode: offerings.mode,
				})
				.from(offerings)
				.where(
					and(
						not(eq(offerings.title, "")),
						or(
							like(offerings.unit, `%${input.search ?? ""}%`),
							like(offerings.title, `%${input.search ?? ""}%`),
						),
					),
				)
				.limit(input.limit)
				.offset(input.offset);
		}),

	getCount: publicProcedure
		.input(
			z.object({
				search: z.string().optional(),
			}),
		)
		.query(async ({ ctx, input }) => {
			const count = await ctx.db
				.selectDistinct({
					unit: offerings.unit,
					title: offerings.title,
					year: offerings.year,
					semester: offerings.semester,
					campus: offerings.campus,
					mode: offerings.mode,
				})
				.from(offerings)
				.where(
					and(
						not(eq(offerings.title, "")),
						or(
							like(offerings.unit, `%${input.search ?? ""}%`),
							like(offerings.title, `%${input.search ?? ""}%`),
						),
					),
				);

			return count?.length ?? 0;
		}),
});
