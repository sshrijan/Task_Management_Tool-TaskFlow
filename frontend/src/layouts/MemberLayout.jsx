import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MemberLayout = () => {
  return (
    <div className="flex h-screen bg-gray-950 text-gray-200">

      <Sidebar role="Member" />

      <div className="flex-1 flex flex-col overflow-hidden">

        <Navbar />

        <main className="flex-1 overflow-auto p-8 bg-gray-950">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default MemberLayout;