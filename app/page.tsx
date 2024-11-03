import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to Youtube Idea Generator
        </h1>
        <p className="text-xl mb-8">
          Generate fresh ideas for your YouTube content
        </p>
        <Link href="/videos">
          <Button size="lg" className="font-semibold">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}
