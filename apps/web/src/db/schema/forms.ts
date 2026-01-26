import { pgTable, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const publishedForms = pgTable("published_forms", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  code: text("code"), // Nullable now, only used as failover if Blob fails
  blobUrl: text("blob_url"),   // URL to Vercel Blob
  config: jsonb("config").$type<any>().notNull(),
  dependencies: jsonb("dependencies").$type<string[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(), // For 24h cleanup
});
