"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Video } from "@/server/db/schema";

export default function VideoList({ videos }: { videos: Video[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
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
                <span>{video.viewCount.toLocaleString()} views</span>
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
  );
}
