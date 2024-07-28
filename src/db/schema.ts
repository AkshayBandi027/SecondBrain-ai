import { relations } from "drizzle-orm"
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  hashedPassword: varchar("hashedPassword"),
})

export type User = typeof users.$inferSelect

export const sessions = pgTable("sessions", {
  id: varchar("id").primaryKey(),
  userId: varchar("userId")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at").notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  notes: many(notes),
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  userId: varchar("userId")
    .notNull()
    .references(() => users.id),
  title: varchar("title").notNull(),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const notesRelations = relations(notes, ({ one }) => ({
  user: one(users, {
    fields: [notes.userId],
    references: [users.id],
  }),
}))

export type NoteType = typeof notes.$inferSelect