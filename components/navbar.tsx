import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { SettingsModal } from "./settings-modal";

export default function Navbar() {
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
              className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-primary text-foreground"
            >
              Videos
            </Link>
            <Link
              href="/ideas"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Ideas
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <SettingsModal />
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
