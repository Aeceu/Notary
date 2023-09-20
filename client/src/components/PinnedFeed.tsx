import { useEffect, useState } from "react";
import TokenStore from "../utils/TokenStore";
import NoteCard from "./NoteCard";
import useNotesStore from "../utils/useNotesStore";
import LoadingAnimation from "./LoadingAnimation";

type StateProps = {
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
}[];

export default function PinnedFeed() {
  const userNotes = useNotesStore((state) => state.userNotes);
  const userID = TokenStore((state) => state.userID);
  const setUserNotes = useNotesStore((state) => state.setUserNotes);
  const [pinnedNotes, setPinnedNotes] = useState<StateProps | undefined>(
    undefined
  );

  useEffect(() => {
    if (userID) {
      setUserNotes(userID);
    }
  }, [setUserNotes, userID]);

  useEffect(() => {
    const pinned = userNotes?.filter((note) => note.isPinned === true);
    setPinnedNotes(pinned);
  }, [userNotes]);

  if (!userNotes) {
    return <LoadingAnimation />;
  }

  return (
    <div className="w-full ">
      <div className="flex flex-col ">
        <h1 className="text-sm">Pinned</h1>
        <span className="w-full columns-1 md:columns-2 lg:columns-4 gap-x-1 ">
          {pinnedNotes &&
            pinnedNotes?.map((notes) => (
              <NoteCard post={notes} key={notes._id} />
            ))}
        </span>
      </div>
    </div>
  );
}
