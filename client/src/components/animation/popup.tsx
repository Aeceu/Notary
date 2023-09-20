import { motion } from "framer-motion";

const Popup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="top-0 left-0 fixed w-full min-h-screen bg-black/30  backdrop-blur-sm flex flex-col items-center justify-center z-50 
    "
    >
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: -2 } }}
        className="text-[#13131A] dark:text-white bg-white dark:bg-[#13131A] dark:placeholder-white group  rounded-lg border-[1px] border-accent   shadow-lg flex flex-col items-center justify-between transition-all duration-500  max-w-[400px] max-h-[500px] overflow-y-scroll"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Popup;
