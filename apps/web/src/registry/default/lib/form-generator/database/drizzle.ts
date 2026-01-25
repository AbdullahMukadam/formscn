import type { Framework } from "../types";

/**
 * Generate Drizzle schema for Better Auth
 */
export function generateDrizzleSchema(): string {
  return `// db/schema.ts
import { pgTable, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  name: text("name"),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  sessionToken: text("sessionToken").notNull().unique(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires: timestamp("expires").notNull(),
});

export const verificationToken = pgTable("verificationToken", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull().unique(),
  expires: timestamp("expires").notNull(),
});`;
}

/**
 * Generate Drizzle client setup
 */
export function generateDrizzleClient(framework: Framework = "next"): string {
  let envVar = 'process.env.DATABASE_URL!';
  
  if (framework === "react" || framework === "tanstack" || framework === "remix") {
    // Client-side DB access isn't safe, but Drizzle client file is usually server-side.
    // React/Vite/TanStack Start (server functions) use Vite envs or standard process.env depending on runtime.
    // For TanStack Start (server), it's process.env or import.meta.env
    // Let's stick to process.env for Server-Side code (DB connection) which is safer assumption for backend.
    // Except Vite which might use import.meta.env
    if (framework === "react") {
       // React SPA shouldn't have DB connection code client-side. Warning? 
       // But we generate it anyway for the 'backend' part.
       envVar = 'process.env.DATABASE_URL!';
    } else {
       // TanStack Start / Remix (Server)
       envVar = 'process.env.DATABASE_URL!';
    }
  }

  return `// db/index.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = ${envVar};
const client = postgres(connectionString);

export const db = drizzle(client, { schema });`;
}
