import { defineConfig } from 'drizzle-kit';
import { env } from 'node:process';

export default defineConfig({
  out: './drizzle',
  schema: './src/data/postgrsql/schemas/Todo.db.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.POSTGRES_URL as string,
  },
});
