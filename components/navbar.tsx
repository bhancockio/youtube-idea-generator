"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { SettingsModal } from "./settings-modal";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  return (
    <nav>
      <div className="py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-1">
            <span className="text-xl font-semibold">YT</span>
            <span className="text-xl">✨</span>
          </Link>

          {isSignedIn && (
            <div className="flex items-center space-x-8 ml-auto mr-4 text-md">
              <Link
                href="/videos"
                className={cn(
                  "text-md",
                  pathname.startsWith("/videos")
                    ? "border-b-2 border-red-500 text-red-500"
                    : "text-primary hover:text-red-500 transition-all"
                )}
              >
                Videos
              </Link>
              <Link
                href="/ideas"
                className={cn(
                  "text-md",
                  pathname.startsWith("/ideas")
                    ? "border-b-2 border-red-500 text-red-500"
                    : "text-primary hover:text-red-500 transition-all"
                )}
              >
                Ideas
              </Link>
              <SettingsModal />
              <UserButton appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }} />
            </div>
          )}
          {!isSignedIn && (
            <Link href="/videos">
              <Button>Get Started</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
