import VideoList from "@/components/video-list";
import { Button } from "@/components/ui/button";
import { getVideosForUser } from "@/server/queries";

export default async function VideosPage() {
  const videos = await getVideosForUser();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Videos</h1>
        <Button>Scrape</Button>
      </div>
      <VideoList videos={videos} />
    </main>
  );
}
