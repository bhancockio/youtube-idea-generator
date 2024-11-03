"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/server/db/drizzle";
import { eq } from "drizzle-orm";
import {
  Video,
  Videos,
  YouTubeChannels,
  YouTubeChannelType,
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
