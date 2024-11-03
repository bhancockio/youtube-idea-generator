import { getVideosForUser } from "@/server/queries";
import VideoList from "@/components/video-list";

export default async function VideosPage() {
  const videos = await getVideosForUser();

  return (
    <main className="p-9">
      <VideoList initialVideos={videos} />
    </main>
  );
}
