import { create } from "zustand";
import { persist } from "zustand/middleware";

type Props = {
  userID: string;
  tokenID: string | null;
  setToken: (id: string | null) => void;
  setUserID: (id: string) => void;
};

const TokenStore = create<Props>()(
  persist(
    (set) => ({
      tokenID: null,
      userID: "",
      setToken: (id: string | null) => {
        set({ tokenID: id });
      },
      setUserID: (id: string) => {
        set({ userID: id });
      },
      removeAuth: () => {},
    }),
    {
      name: "auth",
    }
  )
);

export default TokenStore;
