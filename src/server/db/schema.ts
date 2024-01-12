// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  mysqlTableCreator,
  serial,
  real,
  smallint,
  varchar,
  int,
  index,
  mysqlEnum
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
    mean: real("mean"),
    median: real("median"),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.unit),
  })
);
