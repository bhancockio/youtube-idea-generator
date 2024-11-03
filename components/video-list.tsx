"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Video } from "@/server/db/schema";
import { Button } from "@/components/ui/button";
import { scrapeVideos } from "@/server/youtube-actions";
import { useToast } from "@/hooks/use-toast";

export default function VideoList({
  initialVideos,
}: {
  initialVideos: Video[];
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isScraping, setIsScraping] = useState(false);
  const [videos, setVideos] = useState(initialVideos);
  const { toast } = useToast();

  const handleScrape = async () => {
    setIsScraping(true);
    try {
      const newVideos = await scrapeVideos();
      setVideos((prevVideos) => [...newVideos, ...prevVideos]);
      toast({
        title: "Scrape Successful",
        description: `Scraped ${newVideos.length} new videos`,
      });
    } catch (error) {
      console.error("Error scraping videos:", error);
      let errorMessage = "An unknown error occurred";

      if (error instanceof Error) {
        if (error.message.includes("No channels found for the user")) {
          errorMessage =
            "Please add YouTube channels first by clicking settings in the top right.";
        } else {
          errorMessage = error.message;
        }
      }

      console.log("errorMessage", errorMessage);
      toast({
        title: "Scrape Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsScraping(false);
    }
  };

  useEffect(() => {
    setVideos(initialVideos);
  }, [initialVideos]);

  if (videos.length === 0) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">No Videos Found</h1>
        <p className="mb-4">
          Please add YouTube channels and then scrape for videos.
        </p>
        <Button onClick={handleScrape} disabled={isScraping} className="bg-red-500 hover:bg-red-600 transition-all">
          {isScraping ? "Scraping..." : "Scrape Videos"}
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Videos</h1>
        <Button onClick={handleScrape} disabled={isScraping}>
          {isScraping ? "Scraping..." : "Scrape"}
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Link
            key={video.id}
            href={`/video/${video.id}`}
            className="group block"
            onMouseEnter={() => setHoveredId(video.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <motion.div
              className="rounded-lg overflow-hidden bg-card border shadow-sm"
              animate={{
                scale: hoveredId === video.id ? 1.05 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="aspect-video relative">
                {video.thumbnailUrl ? (
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No thumbnail</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-sm font-medium line-clamp-2 group-hover:text-primary">
                  {video.title}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {video.channelTitle}
                </p>
                <div className="flex items-center text-xs text-muted-foreground mt-2">
                  <span>{video.viewCount?.toLocaleString() ?? "0"} views</span>
                  <span className="mx-1">•</span>
                  <span>
                    {formatDistanceToNow(new Date(video.publishedAt))} ago
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </>
  );
}
