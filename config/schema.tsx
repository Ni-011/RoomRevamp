import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  imageURL: varchar("imageURL", { length: 255 }).notNull(),
  credits: integer("credits").notNull().default(2),
});

export const RoomDesigns = pgTable("roomDesigns", {
  id: serial("id").primaryKey(),
  roomType: varchar("roomType").notNull(),
  Theme: varchar("theme").notNull(),
  userQuery: varchar("userQuery").notNull(),
  ogImageURL: varchar("ogImageURL").notNull(),
  transformedImageURL: varchar("transformedImageURL").notNull(),
  userEMail: varchar("userEMail"),
});
