import { getVideoWithComments } from "@/server/queries";
import VideoDetail from "@/components/video-detail";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function VideoPage({ params }: Props) {
  const resolvedParams = await params;
  const result = await getVideoWithComments(resolvedParams.id);

  if (!result) {
    notFound();
  }

  const { video, comments } = result;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <VideoDetail video={video} comments={comments} />
    </main>
  );
}
