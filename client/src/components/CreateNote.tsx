/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useRef, useState } from "react";
import AutoResize from "../utils/AutoResize";
import { LucideFeather, LucideImage, LucideSend } from "lucide-react";
import axios from "axios";
import TokenStore from "../utils/TokenStore";
import LoadingAnimation from "./LoadingAnimation";
import useNotesStore from "../utils/useNotesStore";

type formProps = {
  title: string;
  description: string;
  isPinned: boolean;
  isBookmarked: boolean;
  image: string | ArrayBuffer | null;
};

export default function CreateNote() {
  const [data, setData] = useState<formProps>({
    title: "",
    description: "",
    isPinned: false,
    isBookmarked: false,
    image: null,
  });
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const userID = TokenStore((state) => state.userID);
  const setUserNotes = useNotesStore((state) => state.setUserNotes);
  const ref = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  AutoResize(textareaRef.current, data.description);

  useEffect(() => {
    const handler = (e: any) => {
      if (ref.current?.contains(e.target)) {
        setToggle(true);
      } else {
        setToggle(false);
        setData({
          title: "",
          description: "",
          isPinned: false,
          isBookmarked: false,
          image: null,
        });
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:4200/notes/${userID}`,
        data
      );
      console.log(res.data.message);
      setUserNotes(userID);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setData({
        title: "",
        description: "",
        isPinned: false,
        isBookmarked: false,
        image: null,
      });
      setToggle(false);
    }
  };

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setData({ ...data, image: reader.result });
      };
    }
  }
  return (
    <div
      ref={ref}
      className="w-full md:w-3/4 lg:w-1/2 flex flex-col items-center  border-2 border-[#13131A] dark:border-white rounded-lg transition-all duration-300"
    >
      {toggle && (
        <input
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="dark:placeholder-white  bg-white dark:bg-[#13131A] rounded-lg   w-full px-2 py-1  outline-none placeholder-black"
          placeholder="Title"
        />
      )}
      <div className="w-full px-2 py-1 rounded-lg flex  gap-2 items-center">
        {!toggle && <LucideFeather size="1.3rem" />}
        <textarea
          ref={textareaRef}
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          rows={1}
          cols={1}
          className="dark:placeholder-white  w-full outline-none resize-none placeholder-black bg-white dark:bg-[#13131A]"
          placeholder={toggle ? "Description" : "Create note..."}
        />
      </div>
      {toggle && (
        <div className="w-full px-2 flex items-center justify-between">
          <div className=" h-[30px]  flex  gap-2 items-center justify-between rounded-b-lg ">
            <span className="  p-2 rounded-full hover:bg-red-100 cursor-pointer">
              <label htmlFor="file">
                <LucideImage size="1rem" className="" />
              </label>
              <input
                accept="image/*"
                type="file"
                className="hidden text-xs border-dashed p-2 border-[1px] rounded-md"
                id="file"
                onChange={handleFile}
              />
            </span>
          </div>
          <span
            onClick={handleSubmit}
            className="  p-2 rounded-full hover:bg-red-100 cursor-pointer"
          >
            {loading ? <LoadingAnimation /> : <LucideSend size="1rem" />}
          </span>
        </div>
      )}
    </div>
  );
}
