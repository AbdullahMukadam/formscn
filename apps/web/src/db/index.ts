import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema/forms';

if (!process.env.DATABASE_URL) {
  // We'll handle this gracefully in the storage layer
  console.warn('DATABASE_URL is not set. Database persistence will be disabled.');
}

const sql = neon(process.env.DATABASE_URL || '');
export const db = drizzle(sql, { schema });
