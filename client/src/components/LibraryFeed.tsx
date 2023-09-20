import { useEffect } from "react";
import TokenStore from "../utils/TokenStore";
import NoteCard from "./NoteCard";
import useNotesStore from "../utils/useNotesStore";
import LoadingAnimation from "./LoadingAnimation";

export default function LibraryFeed() {
  const userNotes = useNotesStore((state) => state.userNotes);
  const userID = TokenStore((state) => state.userID);
  const setUserNotes = useNotesStore((state) => state.setUserNotes);

  useEffect(() => {
    if (userID) {
      setUserNotes(userID);
    }
  }, [setUserNotes, userID]);

  if (!userNotes) {
    return <LoadingAnimation />;
  }

  return (
    <div className="flex">
      <span className="w-full columns-1 md:columns-2 lg:columns-4 gap-x-1 ">
        {userNotes &&
          userNotes?.map((notes) => <NoteCard post={notes} key={notes._id} />)}
      </span>
    </div>
  );
}
