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

export default function BookmarksFeed() {
  const userNotes = useNotesStore((state) => state.userNotes);
  const userID = TokenStore((state) => state.userID);
  const setUserNotes = useNotesStore((state) => state.setUserNotes);
  const [bookmarkNotes, setBookmarkNotes] = useState<StateProps | undefined>(
    undefined
  );
  useEffect(() => {
    if (userID) {
      setUserNotes(userID);
    }
  }, [setUserNotes, userID]);

  useEffect(() => {
    const bookmark = userNotes?.filter((note) => note.isBookmarked === true);
    setBookmarkNotes(bookmark);
  }, [userNotes]);
  return (
    <div className="flex">
      <span className="w-full columns-1 md:columns-2 lg:columns-4 gap-x-1 ">
        {bookmarkNotes?.length ? (
          bookmarkNotes?.map((notes) => (
            <NoteCard post={notes} key={notes._id} />
          ))
        ) : (
          <h1 className="text-blue-500 font-bold">No bookmarks.</h1>
        )}
      </span>
    </div>
  );
}
