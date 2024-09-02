// import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

// export const Budgets = pgTable('budgets', {
//     id: serial('id').primaryKey(),
//     name: varchar('name').notNull(),
//     amount: varchar('amount').notNull(),
//     icon: varchar('icon'),
//     createdBy: varchar('createdBy').notNull()
// })

import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";

export const Budgets = pgTable("budgets", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    amount: integer("amount").notNull(),
    createdBy: varchar("createdBy").notNull(),
    icon: varchar("icon")
});
