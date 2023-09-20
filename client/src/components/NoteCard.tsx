import { LucidePin } from "lucide-react";
import { NoteCardInteractions } from "./Interactions";
import axios from "axios";
import useNotesStore from "../utils/useNotesStore";
import TokenStore from "../utils/TokenStore";
import { useState } from "react";
import NoteModal from "./modal/NoteModal";
// import { Link } from "react-router-dom";

type NotesProps = {
  post: {
    _id: string;
    title: string;
    description: string;
    image: {
      url: string;
      imageID: string;
    };
    isPinned: boolean;
    isBookmarked: boolean;
    isCompleted: boolean;
  };
};

export default function NoteCard({ post }: NotesProps) {
  const [toggle, setToggle] = useState(false);
  const userID = TokenStore((state) => state.userID);
  const setUserNotes = useNotesStore((state) => state.setUserNotes);

  const handlePin = async () => {
    try {
      await axios.get(`http://localhost:4200/notes/updatepin/${post._id}`);
      setUserNotes(userID);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div
      className={`relative  group w-[200px] min-h-[100px] rounded-lg border-accent  shadow-lg  flex-col justify-between h-max inline-block m-2 border-[1px] border-gray-300`}
    >
      <NoteModal
        toggle={toggle}
        handleModalToggle={handleModalToggle}
        post={post}
      />
      <span
        onClick={handlePin}
        className={` absolute right-[4%] top-[1%] group-hover:block  p-2  cursor-pointer  ${
          post.isPinned ? "text-orange-500 block" : "hidden"
        }`}
      >
        <LucidePin size="1.1rem" />
      </span>
      <div
        onClick={handleModalToggle}
        className={`cursor-pointer w-full h-full flex flex-col  p-2 rounded-t-lg`}
      >
        {post.image && (
          <img
            src={post.image.url}
            alt="img"
            className="max-h-[200px] object-cover"
          />
        )}
        <h1 className="font-bold ">{post.title}</h1>
        <p className=" line-clamp-[10] text-justify text-sm">
          {post.description}
        </p>
      </div>
      <NoteCardInteractions
        noteID={post._id}
        isBookmarked={post.isBookmarked}
        isCompleted={post.isCompleted}
      />
    </div>
  );
}
