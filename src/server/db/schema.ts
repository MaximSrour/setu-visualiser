// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
  mysqlTableCreator,
  serial,
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

// export const offerings = mysqlTable(
//   "offerings",
//   {
//     id: int("id").primaryKey().autoincrement(),
//     unit: varchar("unit", { length: 8 }),
//     year: smallint("year"),
//     semester: varchar("semester", { length: 4 }),
//     campus: varchar("campus", { length: 2 }),
//   },
// );

// export const aspects = mysqlTable(
//   "aspects",
//   {
//     id: serial("id").primaryKey().autoincrement(),
//     // offeringId: int("offering_id").notNull().references(() => offerings.id),
//     aspect: varchar("aspect", { length: 4 }),
//     strongAgree: smallint("strong_agree"),
//     agree: smallint("agree"),
//     neutral: smallint("neutral"),
//     disagree: smallint("disagree"),
//     strongDisagree: smallint("strong_disagree"),
//     mean: real("mean"),
//     median: real("median"),
//   },
// );

// export const aspectTypeEnum = mysqlEnum("aspect_type", ["university", "faculty"]);

export const aspectDefinitions = mysqlTable(
  "aspect_definitions",
  {
    aspectType: varchar("aspect_type", { length: 2 }),
    aspect: smallint("aspect"),
    description: varchar("description", { length: 255 }),
  }, (table) => {
    return {
      pk: primaryKey({ columns: [table.aspectType, table.aspect] }),
      //pkWithCustomName: primaryKey({ name: 'id', columns: [table.aspectType, table.aspect] }),
    };
  }
);

export const aspectDefinitionsRelations = relations(aspectDefinitions, ({ many }) => ({
  data: many(data),
}));

export const data = mysqlTable(
  "data",
  {
    id: serial("id").primaryKey().autoincrement(),
    unit: varchar("unit", { length: 8 }),
    year: smallint("year"),
    semester: varchar("semester", { length: 4 }),
    campus: varchar("campus", { length: 2 }),
    aspectType: varchar("aspect_type", { length: 2 }),
    aspect: smallint("aspect"),
    strongAgree: smallint("strong_agree"),
    agree: smallint("agree"),
    neutral: smallint("neutral"),
    disagree: smallint("disagree"),
    strongDisagree: smallint("strong_disagree"),
    mean: double("mean"),
    median: double("median"),
  }
);

export const dataRelations = relations(data, ({ one }) => ({
  aspectDefinition: one(aspectDefinitions, {
    fields: [data.aspectType, data.aspect],
    references: [aspectDefinitions.aspectType, aspectDefinitions.aspect],
  }),
}));
