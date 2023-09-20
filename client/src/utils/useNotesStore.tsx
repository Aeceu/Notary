import axios from "axios";
import { create } from "zustand";

type NoteDetails = {
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

type StoreProps = {
  userNotes: NoteDetails[] | null;
  note: NoteDetails | null;
  setUserNotes: (id: string) => Promise<void>;
  setNote: (id: string) => Promise<void>;
};

const baseUrl = "http://localhost:4200";

const useNotesStore = create<StoreProps>((set) => ({
  userNotes: null,
  note: null,
  setUserNotes: async (id: string) => {
    const res = await axios.get(`${baseUrl}/notes/${id}`);
    set({ userNotes: res.data.userNotes });
  },
  setNote: async (id: string) => {
    const res = await axios.post(`${baseUrl}/notes/`, { postID: id });
    set({ note: res.data.note });
  },
}));

export default useNotesStore;
