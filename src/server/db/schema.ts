// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
	mysqlTableCreator,
	double,
	smallint,
	varchar,
	primaryKey
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `setu-visualiser_${name}`);

export const offerings = mysqlTable(
	"offerings",
	{
		unit: varchar("unit", { length: 8 }),
		year: smallint("year"),
		semester: varchar("semester", { length: 16 }),
		campus: varchar("campus", { length: 2 }),
		mode: varchar("mode", { length: 32 }),
		title: varchar("title", { length: 255 }),
		ceEmail: varchar("ce_email", { length: 127 }),
	}, (table) => {
		return {
			pk: primaryKey({ name: 'id', columns: [table.unit, table.year, table.semester, table.campus, table.mode] }),
		};
	}
);

export const offeringsRelations = relations(offerings, ({ many }) => ({
	aspectData: many(aspectData),
}));

export const aspectData = mysqlTable(
	"aspect_data",
	{
		unit: varchar("unit", { length: 8 }),
		year: smallint("year"),
		semester: varchar("semester", { length: 16 }),
		campus: varchar("campus", { length: 2 }),
		mode: varchar("mode", { length: 32 }),
		aspectType: varchar("aspect_type", { length: 2 }),
		aspect: smallint("aspect"),
		strongAgree: smallint("strong_agree"),
		agree: smallint("agree"),
		neutral: smallint("neutral"),
		disagree: smallint("disagree"),
		strongDisagree: smallint("strong_disagree"),
		mean: double("mean"),
		median: double("median"),
	}, (table) => {
		return {
			pk: primaryKey({ name: 'id', columns: [table.unit, table.year, table.semester, table.campus, table.mode, table.aspectType, table.aspect] }),
		};
	}
);

export const aspectDataRelations = relations(aspectData, ({ one }) => ({
	offering: one(offerings, {
		fields: [aspectData.unit, aspectData.year, aspectData.semester, aspectData.campus, aspectData.mode],
		references: [offerings.unit, offerings.year, offerings.semester, offerings.campus, offerings.mode],
	}),
	aspectDefinition: one(aspectDefinitions, {
		fields: [aspectData.aspectType, aspectData.aspect],
		references: [aspectDefinitions.aspectType, aspectDefinitions.aspect],
	}),
}));

export const aspectDefinitions = mysqlTable(
	"aspect_definitions",
	{
		aspectType: varchar("aspect_type", { length: 2 }),
		aspect: smallint("aspect"),
		description: varchar("description", { length: 255 }),
	}, (table) => {
		return {
			pk: primaryKey({ name: 'id', columns: [table.aspectType, table.aspect] }),
		};
	}
);

export const aspectDefinitionsRelations = relations(aspectDefinitions, ({ many }) => ({
	aspectData: many(aspectData),
}));