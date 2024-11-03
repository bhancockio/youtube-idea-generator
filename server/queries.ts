"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/server/db/drizzle";
import { eq, and } from "drizzle-orm";
import {
  Video,
  Videos,
  YouTubeChannels,
  YouTubeChannelType,
  VideoComments,
} from "@/server/db/schema";

export const getVideosForUser = async (): Promise<Video[]> => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  return db.select().from(Videos).where(eq(Videos.userId, userId));
};

export const getChannelsForUser = async (): Promise<YouTubeChannelType[]> => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  return db
    .select()
    .from(YouTubeChannels)
    .where(eq(YouTubeChannels.userId, userId));
};

export const getVideoWithComments = async (
  videoId: string
): Promise<{
  video: Video;
  comments: (typeof VideoComments.$inferSelect)[];
} | null> => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const videos = await db
    .select()
    .from(Videos)
    .where(and(eq(Videos.id, videoId), eq(Videos.userId, userId)));

  if (videos.length === 0) {
    return null;
  }

  const video = videos[0];

  const comments = await db
    .select()
    .from(VideoComments)
    .where(eq(VideoComments.videoId, videoId))
    .orderBy(VideoComments.publishedAt);

  return { video, comments };
};
