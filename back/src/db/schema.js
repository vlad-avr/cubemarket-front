import { bigint, boolean, integer, pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum('role', ['client', 'admin', 'superadmin'])

export const usersTable = pgTable("users", {
  id: varchar({ length: 255 }).primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar().notNull(),
  balance: integer().notNull(),
  role: roleEnum('role'),
  blocked: boolean(),
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

export const reportTable = pgTable("report", {
  id: varchar({ length: 255 }).primaryKey(),
  date: bigint({mode: 'number'}),
  content: text(),
  reporter: varchar({ length: 255 }).references(() => usersTable.id),
  reported: varchar({ length: 255 }).references(() => usersTable.id),
  reviewed: boolean(),
})
