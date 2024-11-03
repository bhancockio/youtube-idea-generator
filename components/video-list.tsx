"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Video } from "@/server/db/schema";
import { Button } from "@/components/ui/button";
import { scrapeVideos } from "@/server/youtube-actions";
import { useToast } from "@/hooks/use-toast";

// Add this helper function before the VideoList component
const formatViewCount = (count: number): string => {
  if (!count) return "0";

  if (count >= 1000000) {
    return `${(count / 1000000).toLocaleString(undefined, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 0,
    })}M`;
  }

  if (count >= 1000) {
    return `${(count / 1000).toLocaleString(undefined, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 0,
    })}k`;
  }

  return count.toString();
};

export default function VideoList({
  initialVideos,
}: {
  initialVideos: Video[];
}) {
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
        <Button
          onClick={handleScrape}
          disabled={isScraping}
          className="bg-red-500 hover:bg-red-600 transition-all"
        >
          {isScraping ? "Scraping..." : "Scrape Videos"}
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Videos</h1>
        <Button
          onClick={handleScrape}
          disabled={isScraping}
          className="bg-red-500 hover:bg-red-600 transition-all rounded-lg text-md font-semibold px-6 py-3"
        >
          {isScraping ? "Scraping..." : "Scrape"}
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {videos.map((video) => (
          <Link
            key={video.id}
            href={`/video/${video.id}`}
            className="group block"
          >
            <div className="rounded-2xl overflow-hidden border bg-white shadow-sm p-4 space-y-3 hover:scale-[1.05] transition-all duration-300">
              <div className="aspect-video relative">
                {video.thumbnailUrl ? (
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No thumbnail</span>
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <h2 className="font-semibold line-clamp-2 group-hover:text-primary">
                  {video.title}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {video.channelTitle}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>
                    {video.viewCount ? formatViewCount(video.viewCount) : "0"}{" "}
                    views
                  </span>
                  <span className="mx-1">•</span>
                  <span>
                    {formatDistanceToNow(new Date(video.publishedAt))} ago
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
