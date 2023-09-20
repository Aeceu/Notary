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

type Props = {
  pinnedNotes: StateProps;
};

export default function HomeFeed() {
  const userNotes = useNotesStore((state) => state.userNotes);
  const userID = TokenStore((state) => state.userID);
  const setUserNotes = useNotesStore((state) => state.setUserNotes);
  const [pinnedNotes, setPinnedNotes] = useState<StateProps | undefined>(
    undefined
  );
  const [otherNotes, setOTherNotes] = useState<StateProps | undefined>(
    undefined
  );

  useEffect(() => {
    if (userID) {
      setUserNotes(userID);
    }
  }, [setUserNotes, userID]);

  useEffect(() => {
    const pinned = userNotes?.filter((note) => note.isPinned === true);
    const others = userNotes?.filter((note) => note.isPinned === false);
    setPinnedNotes(pinned);
    setOTherNotes(others);
  }, [userNotes]);

  if (!userNotes) {
    return <LoadingAnimation />;
  }

  return (
    <div className="w-full ">
      <div className="flex flex-col">
        <h1 className="text-sm">Pinned</h1>
        {pinnedNotes?.length ? (
          <PinnedFeed pinnedNotes={pinnedNotes} />
        ) : (
          <h1 className="text-red-500 font-bold">no pinned notes.</h1>
        )}
      </div>
      <div className="flex flex-col  mt-4">
        <h1 className="text-sm">Others</h1>
        {otherNotes?.length ? (
          <OthersFeed pinnedNotes={otherNotes} />
        ) : (
          <h1 className="text-orange-500 font-bold">empty notes</h1>
        )}
      </div>
    </div>
  );
}

const PinnedFeed = ({ pinnedNotes }: Props) => {
  return (
    <span className="w-full columns-1 md:columns-2 lg:columns-4 gap-x-4">
      {pinnedNotes &&
        pinnedNotes?.map((notes) => <NoteCard post={notes} key={notes._id} />)}
    </span>
  );
};

const OthersFeed = ({ pinnedNotes }: Props) => {
  return (
    <span className="w-full columns-1 md:columns-2 lg:columns-4 gap-x-1 ">
      {pinnedNotes &&
        pinnedNotes?.map((notes) => <NoteCard post={notes} key={notes._id} />)}
    </span>
  );
};
