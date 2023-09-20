import { LucidePin } from "lucide-react";
import PinnedFeed from "../components/PinnedFeed";

export default function Pinned() {
  return (
    <div className="w-full h-screen md:h-[calc(100vh-32px)] p-4 flex flex-col  gap-4 rounded-lg shadow-lg bg-white dark:bg-[#13131A] dark:text-white overflow-y-scroll">
      <header className="w-full p-4 flex gap-2 items-center text-4xl border-b-[1px] border-accent">
        <LucidePin size="2.5rem" />
        <h1 className="lg:text-4xl md:text-2xl text-xl font-bold">Pinned</h1>
      </header>
      <p>Displays all the Pinned notes.</p>
      <PinnedFeed />
    </div>
  );
}
