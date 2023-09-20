import { useEffect, useState } from "react";
import useNotesStore from "../utils/useNotesStore";
import TokenStore from "../utils/TokenStore";
import NoteCard from "./NoteCard";

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

export default function CompletedFeed() {
  const userNotes = useNotesStore((state) => state.userNotes);
  const userID = TokenStore((state) => state.userID);
  const setUserNotes = useNotesStore((state) => state.setUserNotes);
  const [completedNotes, setCompletedNotes] = useState<StateProps | undefined>(
    undefined
  );
  useEffect(() => {
    if (userID) {
      setUserNotes(userID);
    }
  }, [setUserNotes, userID]);

  useEffect(() => {
    const completed = userNotes?.filter((note) => note.isCompleted === true);
    setCompletedNotes(completed);
  }, [userNotes]);
  return (
    <div className="flex">
      <span className="w-full columns-1 md:columns-2 lg:columns-4 gap-x-1 ">
        {completedNotes?.length ? (
          completedNotes?.map((notes) => (
            <NoteCard post={notes} key={notes._id} />
          ))
        ) : (
          <h1 className="text-emerald-500 font-bold">No completed.</h1>
        )}
      </span>
    </div>
  );
}
