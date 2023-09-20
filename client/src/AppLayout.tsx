import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2f2f8]">
      <div className="w-full flex justify-between p-0 md:p-4 gap-2 md:gap-4">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}
