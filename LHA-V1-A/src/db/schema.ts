import { pgTable, text, timestamp, serial, jsonb } from "drizzle-orm/pg-core";

export const applicationInquiries = pgTable("application_inquiries", {
  id: serial("id").primaryKey(),
  referenceId: text("reference_id").notNull().unique(),
  applicantName: text("applicant_name").notNull(),
  district: text("district").notNull(),
  status: text("status").notNull().default("draft_created"),
  notes: text("notes"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
