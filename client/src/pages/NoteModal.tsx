import { useEffect, useRef, useState } from "react";
import { LucideX } from "lucide-react";
import { Link } from "react-router-dom";
import Popup from "../components/animation/popup";
import { Interactions } from "../components/Interactions";
import { useParams } from "react-router-dom";
import useNotesStore from "../utils/useNotesStore";
import AutoResize from "../utils/AutoResize";

type formProps = {
  title: string | undefined;
  description: string | undefined;
  isPinned: boolean | undefined;
  isBookmarked: boolean | undefined;
  isCompleted: boolean | undefined;
};

const NoteModal = () => {
  const { id } = useParams();
  const note = useNotesStore((state) => state.note);
  const setNote = useNotesStore((state) => state.setNote);
  const [currentData, setcurrentData] = useState<formProps>({
    title: "",
    description: "",
    isPinned: false,
    isBookmarked: false,
    isCompleted: false,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  AutoResize(textareaRef.current, currentData?.description);

  useEffect(() => {
    if (id) {
      setNote(id);
    }
  }, [id, setNote]);

  useEffect(() => {
    setcurrentData({
      title: note?.title,
      description: note?.description,
      isPinned: note?.isPinned,
      isBookmarked: note?.isBookmarked,
      isCompleted: note?.isCompleted,
    });
  }, []);
  return (
    <Popup>
      <div
        className="relative h-full flex flex-col gap-2 p-2 justify-center rounded-t-lg
      bg-white text-black "
      >
        <Link to="/" className="flex justify-end ">
          <LucideX size="1rem" />
        </Link>
        {note?.image && (
          <img
            src={note?.image.url}
            alt="img"
            className="object-cover max-h-[300px]"
          />
        )}
        {currentData?.title && (
          <input
            type="text"
            placeholder="title"
            className="font-bold outline-none text-black"
            value={currentData.title}
            onChange={(e) =>
              setcurrentData({ ...currentData, title: e.target.value })
            }
          />
        )}
        {currentData && (
          <textarea
            ref={textareaRef}
            value={currentData?.description}
            onChange={(e) =>
              setcurrentData({ ...currentData, description: e.target.value })
            }
            rows={1}
            cols={1}
            className="  w-full outline-none resize-none placeholder-black"
          />
        )}
      </div>
      {note && (
        <Interactions
          noteID={note._id}
          isBookmarked={note.isBookmarked}
          isCompleted={note.isCompleted}
        />
      )}
    </Popup>
  );
};

export default NoteModal;
