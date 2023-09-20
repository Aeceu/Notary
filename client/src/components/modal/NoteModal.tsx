import { useState, useEffect, useRef } from "react";
import AutoResize from "../../utils/AutoResize";
import Popup from "../animation/popup";
import { LucideX } from "lucide-react";
import { Interactions } from "../Interactions";
import axios from "axios";
import useNotesStore from "../../utils/useNotesStore";
import TokenStore from "../../utils/TokenStore";

type formProps = {
  _id: string;
  title: string;
  description: string;
  isPinned: boolean;
  isBookmarked: boolean;
  isCompleted: boolean;
};

type ModalProps = {
  toggle: boolean;
  handleModalToggle: () => void;
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

const NoteModal = ({ toggle, handleModalToggle, post }: ModalProps) => {
  const [currentData, setcurrentData] = useState<formProps>({
    _id: "",
    title: "",
    description: "",
    isPinned: false,
    isBookmarked: false,
    isCompleted: false,
  });
  const userID = TokenStore((state) => state.userID);
  const setUserNotes = useNotesStore((state) => state.setUserNotes);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  AutoResize(textareaRef.current, currentData.description, handleModalToggle);

  useEffect(() => {
    setcurrentData({
      _id: post._id,
      title: post.title,
      description: post.description,
      isPinned: post.isPinned,
      isBookmarked: post.isBookmarked,
      isCompleted: post.isCompleted,
    });
  }, []);

  useEffect(() => {
    const handleUpdate = async () => {
      await axios.patch(`http://localhost:4200/notes/${post._id}`, currentData);
      setUserNotes(userID);
    };
    setTimeout(() => {
      handleUpdate();
    }, 1000);
  }, [currentData, post._id]);

  if (toggle) {
    return (
      <Popup>
        <div className="">
          <button
            type="button"
            onClick={handleModalToggle}
            className="w-full p-1 flex justify-end dark:text-white "
          >
            <LucideX size="1rem" />
          </button>
          {post.image && (
            <img
              src={post.image.url}
              alt="img"
              className="object-cover w-full"
            />
          )}
          <input
            type="text"
            placeholder="title"
            className="px-4 w-full  font-bold outline-none text-[#13131A] dark:text-white bg-white dark:bg-[#13131A] dark:placeholder-white"
            value={currentData.title}
            onChange={(e) =>
              setcurrentData({ ...currentData, title: e.target.value })
            }
          />
          <textarea
            ref={textareaRef}
            placeholder="description"
            value={currentData?.description}
            onChange={(e) =>
              setcurrentData({ ...currentData, description: e.target.value })
            }
            className="w-full px-4 outline-none resize-none text-[#13131A] dark:text-white dark:placeholder-white bg-white dark:bg-[#13131A] "
          />
          <Interactions
            noteID={currentData._id}
            isBookmarked={currentData.isBookmarked}
            isCompleted={currentData.isCompleted}
            isPinned={currentData.isPinned}
            handleModalToggle={handleModalToggle}
          />
        </div>
      </Popup>
    );
  }
};

export default NoteModal;
