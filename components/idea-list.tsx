"use client";

import { Idea } from "@/server/db/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface Props {
  initialIdeas: Idea[];
}

export default function IdeaList({ initialIdeas }: Props) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ideas</h1>
        <Button>Generate</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialIdeas.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground mb-4">
              No ideas yet. Click Generate to create some ideas from your video
              comments.
            </p>
            <Button>Generate Ideas</Button>
          </div>
        ) : (
          initialIdeas.map((idea) => (
            <Card key={idea.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold line-clamp-2">
                    {idea.description}
                  </CardTitle>
                  <Badge variant="secondary" className="ml-2 shrink-0">
                    Score: {idea.score}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 grid gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Research Links</h3>
                  <ul className="space-y-2">
                    {idea.research.map((url, index) => (
                      <li key={index} className="text-sm">
                        <Link
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          {new URL(url).hostname}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-xs text-muted-foreground mt-auto">
                  <Link
                    href={`/video/${idea.videoId}`}
                    className="hover:underline"
                  >
                    View source video
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </>
  );
}
