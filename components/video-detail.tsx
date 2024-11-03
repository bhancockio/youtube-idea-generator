"use client";

import { Video, VideoComments } from "@/server/db/schema";
import { formatDistanceToNow } from "date-fns";
import { ThumbsUp, MessageSquare, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Props {
  video: Video;
  comments: (typeof VideoComments.$inferSelect)[];
}

export default function VideoDetail({ video, comments }: Props) {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{video.viewCount?.toLocaleString() ?? "0"} views</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            <span>{video.likeCount?.toLocaleString() ?? "0"} likes</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>{video.commentCount?.toLocaleString() ?? "0"} comments</span>
          </div>
          <span>•</span>
          <span>{formatDistanceToNow(new Date(video.publishedAt))} ago</span>
        </div>
      </div>

      <div className="grid gap-4">
        <h2 className="text-xl font-semibold">Description</h2>
        <p className="text-sm whitespace-pre-wrap text-muted-foreground">
          {video.description}
        </p>
      </div>

      <div className="grid gap-4">
        <h2 className="text-xl font-semibold">Comments</h2>
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No comments yet.</p>
        ) : (
          <div className="grid gap-4">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {comment.commentText.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1.5">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">Anonymous</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.publishedAt))}{" "}
                          ago
                        </div>
                      </div>
                      <p className="text-sm">{comment.commentText}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{comment.likeCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
