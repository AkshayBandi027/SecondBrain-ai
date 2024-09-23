import { relations } from "drizzle-orm"
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  hashedPassword: varchar("hashedPassword"),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: varchar("userId")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at").notNull(),
})

export const posts = pgTable("posts", {
  id: text("id").primaryKey(),
  userId: varchar("userId")
    .notNull()
    .references(() => users.id),
  title: varchar("title").notNull(),
  content: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}))

export type Post = typeof posts.$inferSelect
export type NewPost = typeof posts.$inferInsert
