import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

if (!process.env.NEXT_PUBLIC_DATABASE_URL) {
  throw new Error('NEXT_PUBLIC_DATABASE_URL is not defined in environment variables');
}

export default defineConfig({
  schema: './config/schema.tsx',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL,
  },
});
