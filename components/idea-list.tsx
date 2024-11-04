"use client";

import { useState } from "react";
import { Idea } from "@/server/db/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MoveUpRight } from "lucide-react";
import Link from "next/link";
import { generateDummyIdea } from "@/server/ideas-actions";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  initialIdeas: Idea[];
}

export default function IdeaList({ initialIdeas }: Props) {
  const [ideas, setIdeas] = useState<Idea[]>(initialIdeas);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const newIdea = await generateDummyIdea();
      if (newIdea) {
        setIdeas((prevIdeas) => [newIdea, ...prevIdeas]);
        toast({
          title: "New idea generated!",
          description: "A new dummy idea has been added to your list.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to generate a new idea. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error generating dummy idea:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Ideas</h1>
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="bg-red-500 hover:bg-red-600 transition-all rounded-lg text-md font-semibold px-6 py-3"
        >
          {isGenerating ? "Generating..." : "Generate"}
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {ideas.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground mb-4">
              No ideas yet. Click Generate to create some ideas from your video
              comments.
            </p>
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Generate Ideas"}
            </Button>
          </div>
        ) : (
          ideas.map((idea) => (
            <div key={idea.id} className="group">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="rounded-2xl border bg-white shadow-sm p-5 space-y-3 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                    <div className="flex items-start justify-between space-x-2">
                      <h3 className="text-lg font-semibold line-clamp-2">
                        {idea.description}
                      </h3>
                      <Link
                        href={`/video/${idea.videoId}`}
                        className=""
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoveUpRight
                          className="h-4 w-4 text-red-500"
                          strokeWidth={2}
                        />
                      </Link>
                    </div>
                    <Badge variant="secondary" className="text-sm text-red-500">
                      Score: {idea.score}
                    </Badge>
                  </div>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                      <span className="text-xl font-bold">
                        {idea.description}
                      </span>
                      <Badge variant="secondary">Score: {idea.score}</Badge>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
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
                    <div className="pt-4 border-t">
                      <Link
                        href={`/video/${idea.videoId}`}
                        className="text-sm text-muted-foreground hover:underline"
                      >
                        View source video
                      </Link>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))
        )}
      </div>
    </>
  );
}
