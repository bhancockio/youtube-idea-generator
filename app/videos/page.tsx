import { getVideosForUser } from "@/server/queries";
import VideoList from "@/components/video-list";

export default async function VideosPage() {
  const videos = await getVideosForUser();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <VideoList initialVideos={videos} />
    </main>
  );
}
