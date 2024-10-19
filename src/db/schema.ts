import { PgTable, pgTable, text, timestamp, varchar,pgEnum } from "drizzle-orm/pg-core"

export const messageRoleEnum = pgEnum("message_role_enum",["user","system"])

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

export const chat = pgTable("chat",{
   id: text("id").primaryKey(),
   userId: varchar("userId").notNull().references(() => users.id),
   documentName: text("document_name").notNull(),
   documentUrl: text("document_url").notNull(),
   createdAt: timestamp("created_at").notNull(),
})

export const messages = pgTable("messages", {
  id: text ("id").primaryKey(),
  chatId: varchar("chatId").notNull().references(() => chat.id),
  createdAt: timestamp("created_at").notNull(),
  content: text("content").notNull(),
  role: messageRoleEnum("role").notNull()
})

export type Chat = typeof chat.$inferSelect
export type NewChat = typeof chat.$inferInsert
export type Message = typeof messages.$inferSelect    
