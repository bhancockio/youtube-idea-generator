"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/server/db/drizzle";
import { eq, and } from "drizzle-orm";
import {
  Videos,
  VideoComments,
  Ideas,
  InsertIdea,
  Idea,
} from "@/server/db/schema";

export async function generateDummyIdea(): Promise<Idea | null> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  // Fetch the first video for the user
  const [video] = await db
    .select()
    .from(Videos)
    .where(eq(Videos.userId, userId))
    .limit(1);

  if (!video) {
    console.error("No videos found for the user");
    return null;
  }

  // Fetch the first comment for the video
  const [comment] = await db
    .select()
    .from(VideoComments)
    .where(
      and(eq(VideoComments.videoId, video.id), eq(VideoComments.userId, userId))
    )
    .limit(1);

  if (!comment) {
    console.error("No comments found for the video");
    return null;
  }

  // Generate dummy data for the Idea
  const dummyIdea: InsertIdea = {
    userId,
    videoId: video.id,
    commentId: comment.id,
    score: Math.floor(Math.random() * 100), // Random score between 0 and 99
    description: `Dummy idea generated from video: ${video.title}`,
    research: [
      "https://www.youtube.com/watch?v=dummyVideo1",
      "https://www.youtube.com/watch?v=dummyVideo2",
      "https://www.youtube.com/watch?v=dummyVideo3",
    ],
  };

  // Insert the dummy idea into the database
  try {
    const [insertedIdea] = await db.insert(Ideas).values(dummyIdea).returning();
    console.log("Dummy idea inserted successfully:", insertedIdea);
    return insertedIdea;
  } catch (error) {
    console.error("Error inserting dummy idea:", error);
    return null;
  }
}
