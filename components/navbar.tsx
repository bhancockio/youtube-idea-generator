"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { SettingsModal } from "./settings-modal";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          <Link href="/" className="flex items-center space-x-1">
            <span className="text-lg font-semibold">YT</span>
            <span className="text-lg">✨</span>
          </Link>

          <div className="flex items-center space-x-8 ml-auto mr-4">
            <Link
              href="/videos"
              className={cn(
                "inline-flex items-center px-1 pt-1 text-sm font-medium",
                pathname.startsWith("/videos")
                  ? "border-b-2 border-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Videos
            </Link>
            <Link
              href="/ideas"
              className={cn(
                "inline-flex items-center px-1 pt-1 text-sm font-medium",
                pathname.startsWith("/ideas")
                  ? "border-b-2 border-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Ideas
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <SettingsModal />
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  );
}
