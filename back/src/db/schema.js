import { bigint, boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core";
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
  price: integer(),
  delete: boolean(),
  picture: varchar({ length: 255 }),
  userId: varchar({ length: 255 }).references(() => usersTable.id)
})

export const transactionTable = pgTable("transactions", {
  id: varchar({ length: 255 }).primaryKey(),
  amount_sold: integer().notNull(),
  amount_payed: integer().notNull(),
  date: bigint({mode: 'number'}),
  product: varchar({ length: 255 }).references(() => productTable.id),
  buyer: varchar({ length: 255 }).references(() => usersTable.id),
})
