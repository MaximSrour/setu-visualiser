import { aspectRouter } from "~/server/api/routers/aspects";
import { offeringRouter } from "~/server/api/routers/offerings";

import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  aspects: aspectRouter,
  offerings: offeringRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
