import CreateNote from "../components/CreateNote";
import HomeFeed from "../components/HomeFeed";
import HomeHeader from "../components/HomeHeader";
export default function Home() {
  return (
    <div className="w-full h-screen md:h-[calc(100vh-32px)] p-4 flex flex-col items-center gap-2 rounded-none md:rounded-lg shadow-lg bg-white dark:bg-[#13131A] dark:text-white overflow-y-scroll">
      <HomeHeader />
      <CreateNote />
      <HomeFeed />
    </div>
  );
}
