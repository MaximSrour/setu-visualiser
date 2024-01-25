import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { offerings } from "~/server/db/schema";

import { like } from "drizzle-orm";

export const unitRouter = createTRPCRouter({
	getUnits: publicProcedure
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
				})
				.from(offerings)
				.where(like(offerings.unit, `%${input.search ?? ""}%`))
				.limit(input.limit)
				.offset(input.offset);
		}),

	getUnitCount: publicProcedure
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
				})
				.from(offerings)
				.where(like(offerings.unit, `%${input.search ?? ""}%`));

			return count?.length ?? 0;
		}),
});
