import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const todosTable = pgTable("todos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 1024 }),
  completeAt: timestamp(),
  createAt: timestamp().notNull().defaultNow(),
  updateAt: timestamp().notNull().defaultNow(),
});
