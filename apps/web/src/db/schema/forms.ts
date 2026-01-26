import { pgTable, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const publishedForms = pgTable("published_forms", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  code: text("code").notNull(), // Small forms can stay in DB, large ones in Blob
  blobUrl: text("blob_url"),   // URL to Vercel Blob if stored there
  config: jsonb("config").$type<any>().notNull(),
  dependencies: jsonb("dependencies").$type<string[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(), // For 24h cleanup
});
