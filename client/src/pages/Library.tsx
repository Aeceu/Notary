import { LucideLibrary } from "lucide-react";
import LibraryFeed from "../components/LibraryFeed";

export default function Library() {
  return (
    <div className="w-full h-screen md:h-[calc(100vh-32px)] p-4 flex flex-col  gap-4 rounded-lg shadow-lg  overflow-y-scroll bg-white dark:bg-[#13131A] dark:text-white">
      <header className="w-full p-4 flex gap-2 items-center text-4xl border-b-[1px] border-accent">
        <LucideLibrary size="2.5rem" />
        <h1 className="lg:text-4xl md:text-2xl text-xl font-bold">Library</h1>
      </header>
      <p>Displays all the notes.</p>
      <LibraryFeed />
    </div>
  );
}
