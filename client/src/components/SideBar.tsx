import {
  LucideHome,
  LucideLibrary,
  LucideBookmark,
  LucideBookOpenCheck,
  LucideBookPlus,
  LucideArrowLeftFromLine,
  LucideArrowRightFromLine,
  LucidePin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logout from "./Logout";
import ThemeButton from "./ThemeButton";

const links = [
  {
    href: "/",
    name: "Home",
    icon: <LucideHome size="1.3rem" />,
  },
  {
    href: "/library",
    name: "Library",
    icon: <LucideLibrary size="1.3rem" />,
  },
  {
    href: "/pins",
    name: "Pinned",
    icon: <LucidePin size="1.3rem" />,
  },
  {
    href: "/bookmarks",
    name: "Bookmarks",
    icon: <LucideBookmark size="1.3rem" />,
  },
  {
    href: "/completed",
    name: "Completed",
    icon: <LucideBookOpenCheck size="1.3rem" />,
  },
];
export default function SideBar() {
  const [minimize, setMinimize] = useState(false);
  const [toggle, setToggle] = useState(0);

  return (
    <div
      className={`w-[80px] ${
        minimize ? "w-[80px] items-center" : "  md:w-[244px]  md:items-end "
      } h-screen md:h-[calc(100vh-32px)] flex flex-col  justify-between gap-4 p-2 rounded-none md:rounded-lg
      transition-all duration-300 bg-white dark:bg-[#13131A] text-black  shadow-lg`}
    >
      <span className="p-2 hidden md:flex dark:text-white">
        {minimize ? (
          <LucideArrowRightFromLine
            onClick={() => setMinimize((prev) => !prev)}
            className="cursor-pointer "
          />
        ) : (
          <LucideArrowLeftFromLine
            onClick={() => setMinimize((prev) => !prev)}
            className="cursor-pointer "
          />
        )}
      </span>

      <div className="w-full h-[100px] flex justify-center items-center gap-2 dark:text-white">
        <span>
          <LucideBookPlus size="2rem" />
        </span>
        {!minimize && (
          <h1 className="font-bold text-2xl md:flex hidden">Notary</h1>
        )}
      </div>

      <ul className="w-full h-full flex flex-col gap-2">
        {links.map((link, i) => (
          <Link
            onClick={() => setToggle(i)}
            key={i}
            to={link.href}
            className={`flex gap-2 items-center md:justify-start justify-center px-4 py-2 rounded-lg  p-2  ${
              toggle === i
                ? "bg-[#13131A]  dark:bg-white text-white dark:text-black"
                : "dark:text-white"
            } ${minimize ? "w-max" : "w-full"}`}
          >
            <span>{link.icon}</span>
            {!minimize && <h1 className="md:flex hidden">{link.name}</h1>}
          </Link>
        ))}
        <ThemeButton />
      </ul>
      <Logout minimize={minimize} />
    </div>
  );
}
