import { Bell, Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchModal from "../components/SearchModal";
import { useSearch } from "../context/SearchContext";

const Navbar = () => {
  const { openSearch,setOpenSearch } = useSearch();

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">

        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          TaskFlow
        </h1>

        <div className="relative flex-1 max-w-md mx-8">
          <input
            type="text"
            placeholder="Search Anything..."
            onClick={() => setOpenSearch(true)}
            readOnly
            className="w-full bg-gray-100 dark:bg-gray-800 pl-10 pr-4 py-2.5 rounded-xl text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={20}
          />
        </div>

        <div className="flex items-center gap-4">

          {/* <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl">
            <Bell size={20} />
          </button> */}

          <div className="flex items-center gap-3 pl-4 border-l">

            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div>
              <p className="text-sm font-medium">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-gray-500">
                {user?.email || ""}
              </p>

              <p className="text-xs text-blue-500">
                {user?.role || ""}
              </p>
            </div>

          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/40 transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>
      {openSearch && (
        <SearchModal />
      )}
    </nav>
  );
};

export default Navbar;