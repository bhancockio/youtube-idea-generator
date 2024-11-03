import IdeaList from "@/components/idea-list";
import { getIdeasForUser } from "@/server/queries";

export default async function IdeasPage() {
  const ideas = await getIdeasForUser();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <IdeaList initialIdeas={ideas} />
    </main>
  );
}
