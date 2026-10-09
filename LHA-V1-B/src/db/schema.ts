import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * Reference data only. NO personal / applicant information is ever written to
 * the database — the whole wizard runs in the browser.
 */

/** Mapping between the three source forms and the web form fields. */
export const formFieldMap = pgTable("form_field_map", {
  id: serial("id").primaryKey(),
  sourceForm: varchar("source_form", { length: 64 }).notNull(),
  section: varchar("section", { length: 128 }).notNull(),
  sourceLabel: text("source_label").notNull(),
  sourceLabelMl: text("source_label_ml").notNull().default(""),
  webField: varchar("web_field", { length: 128 }).notNull(),
  requirement: varchar("requirement", { length: 24 }).notNull().default("optional"),
  status: varchar("status", { length: 32 }).notNull().default("mapped"),
  notes: text("notes").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

/** Anonymous counter — no identifiers, no payload. */
export const usageCounter = pgTable("usage_counter", {
  id: serial("id").primaryKey(),
  eventName: varchar("event_name", { length: 64 }).notNull(),
  total: integer("total").notNull().default(0),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
