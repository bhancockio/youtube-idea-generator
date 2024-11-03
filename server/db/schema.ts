import {
  integer,
  text,
  pgTable,
  timestamp,
  varchar,
  uuid,
} from "drizzle-orm/pg-core";

export const Videos = pgTable("videos", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("user_id", { length: 50 }).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  publishedAt: timestamp("published_at").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  channelId: text("channel_id").notNull(),
  channelTitle: text("channel_title").notNull(),
  viewCount: integer("view_count").default(0),
  likeCount: integer("like_count").default(0),
  dislikeCount: integer("dislike_count").default(0),
  commentCount: integer("comment_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const YouTubeChannels = pgTable("youtube_channels", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("user_id", { length: 50 }).notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Types
export type Video = typeof Videos.$inferSelect;
export type InsertVideo = typeof Videos.$inferInsert;
export type YouTubeChannelType = typeof YouTubeChannels.$inferSelect;
export type InsertYouTubeChannel = typeof YouTubeChannels.$inferInsert;
