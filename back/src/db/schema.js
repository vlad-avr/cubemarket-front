import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
  id: varchar({ length: 255 }).primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar().notNull(),
  balance: integer().notNull(),
});

export const productTable = pgTable("products", {
  id: varchar({ length: 255 }).primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  leftover: integer().notNull(),
  description: varchar(),
  picture: varchar({ length: 255 }),
  userId: varchar({ length: 255 }).references(() => usersTable.id)
})

