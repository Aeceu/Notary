import { LucideLogOut } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TokenStore from "../utils/TokenStore";

export default function Logout({ minimize }: { minimize: boolean }) {
  const navigate = useNavigate();
  const setToken = TokenStore((state) => state.setToken);
  const setUserID = TokenStore((state) => state.setUserID);
  const handleLogOut = async () => {
    try {
      const res = await axios.get("http://localhost:4200/logout");
      console.log(res.data);
      setToken("");
      setUserID("");
      navigate("/login");
    } catch (error) {
      console.log("Failed to logout!");
    }
  };

  return (
    <button
      onClick={handleLogOut}
      type="button"
      className={`${minimize && "justify-center"} 
         w-full flex items-center md:justify-start justify-center gap-2 bg-[#13131A] text-white px-4 py-2  rounded-lg dark:bg-white dark:text-[#13131A]`}
    >
      <span>
        <LucideLogOut size="1.3rem" />
      </span>
      {!minimize && (
        <span className="md:flex hidden">
          <p className="w-max">log-out</p>
        </span>
      )}
    </button>
  );
}
