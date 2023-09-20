import axios from "axios";
import {
  LucideBookOpenCheck,
  LucideBookmark,
  LucideImage,
  LucideTrash,
  LucidePin,
} from "lucide-react";
import TokenStore from "../utils/TokenStore";
import useNotesStore from "../utils/useNotesStore";
import { ChangeEvent } from "react";

type Props = {
  noteID: string;
  isBookmarked: boolean;
  isCompleted: boolean;
};

type Props2 = {
  noteID: string;
  isBookmarked: boolean;
  isCompleted: boolean;
  isPinned: boolean;
  handleModalToggle: () => void;
};

export const NoteCardInteractions = ({
  noteID,
  isBookmarked,
  isCompleted,
}: Props) => {
  const userID = TokenStore((state) => state.userID);
  const setUserNotes = useNotesStore((state) => state.setUserNotes);

  const handleBookmark = async () => {
    try {
      await axios.get(`http://localhost:4200/notes/updatebookmark/${noteID}`);
      setUserNotes(userID);
    } catch (error) {
      console.log(error);
    }
  };
  const handleComplete = async () => {
    try {
      await axios.get(`http://localhost:4200/notes/updatecomplete/${noteID}`);
      setUserNotes(userID);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4200/notes/${noteID}`);
      setUserNotes(userID);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-[40px] px-2 flex  gap-2 items-center justify-between w-full rounded-b-lg bg-white dark:bg-[#13131A] text-[#13131A] dark:text-white">
      <span
        onClick={handleBookmark}
        className={`group-hover:block hidden  p-2 rounded-full cursor-pointer ${
          isBookmarked ? "text-orange-500" : "hover:text-orange-500 "
        }`}
      >
        <LucideBookmark size="1rem" className="" />
      </span>
      <span
        onClick={handleComplete}
        className={`group-hover:block hidden  p-2 rounded-full  cursor-pointer ${
          isCompleted ? "text-emerald-500" : "hover:text-emerald-500"
        }`}
      >
        <LucideBookOpenCheck size="1rem" className="" />
      </span>
      <span
        onClick={handleDelete}
        className="group-hover:block hidden  p-2 rounded-full hover:text-red-500 cursor-pointer"
      >
        <LucideTrash size="1rem" className="" />
      </span>
    </div>
  );
};

export const Interactions = ({
  noteID,
  handleModalToggle,
  isBookmarked,
  isCompleted,
  isPinned,
}: Props2) => {
  const userID = TokenStore((state) => state.userID);
  const setUserNotes = useNotesStore((state) => state.setUserNotes); //refreshes the all notes
  const setNote = useNotesStore((state) => state.setNote);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        handleImageUpdate(reader.result);
      };
    }
  }
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4200/notes/${noteID}`);
      setUserNotes(userID);
    } catch (error) {
      console.log(error);
    }
  };
  const handleBookmark = async () => {
    try {
      await axios.get(`http://localhost:4200/notes/updatebookmark/${noteID}`);
      setUserNotes(userID);
    } catch (error) {
      console.log(error);
    }
  };
  const handleComplete = async () => {
    try {
      await axios.get(`http://localhost:4200/notes/updatecomplete/${noteID}`);
      setUserNotes(userID);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePin = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4200/notes/updatepin/${noteID}`
      );
      setUserNotes(userID);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageUpdate = async (image: string | ArrayBuffer | null) => {
    try {
      await axios.post(`http://localhost:4200/notes/updateimage/${noteID}`, {
        image: image,
      });
      setNote(noteID);
      setUserNotes(userID);
      handleModalToggle();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-[40px] px-2 flex  gap-2 items-center justify-between w-full rounded-b-lg bg-white dark:bg-[#13131A] text-[#13131A] dark:text-white">
      <span
        onClick={handleBookmark}
        className={`group-hover:block hidden  p-2 rounded-full cursor-pointer ${
          isBookmarked ? "text-orange-500" : "hover:text-orange-500 "
        }`}
      >
        <LucideBookmark size="1rem" className="" />
      </span>
      <span
        onClick={handleComplete}
        className={`group-hover:block hidden  p-2 rounded-full  cursor-pointer ${
          isCompleted ? "text-emerald-500" : "hover:text-emerald-500"
        }`}
      >
        <LucideBookOpenCheck size="1rem" className="" />
      </span>
      <span
        onClick={handleDelete}
        className="  p-2 rounded-full hover:text-red-500 cursor-pointer"
      >
        <LucideTrash size="1rem" className="" />
      </span>
      <span className="  p-2 rounded-full hover:text-blue-500 cursor-pointer">
        <label htmlFor="file">
          <LucideImage size="1rem" />
        </label>
        <input
          accept="image/*"
          type="file"
          className="hidden text-xs border-dashed p-2 border-[1px] rounded-md"
          id="file"
          onChange={handleFile}
        />
      </span>
      <span
        onClick={handlePin}
        className={` p-2 rounded-full hover:text-red-500 cursor-pointer ${
          isPinned ? "text-orange-500 block" : "hidden"
        }`}
      >
        <LucidePin size="1rem" />
      </span>
    </div>
  );
};
