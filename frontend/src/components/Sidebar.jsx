import { LayoutDashboard, Users, FolderOpen, CheckSquare } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: user?.role === "Admin" ? "/admin" : "/member",
      roles: ["Admin", "Member"]
    },
    {
      icon: CheckSquare,
      label: "Tasks",
      path: user?.role === "Admin" ? "/admin/tasks" : "/member/tasks",
      roles: ["Admin", "Member"]
    },
    {
      icon: FolderOpen,
      label: "Projects",
      path: "/admin/projects",
      roles: ["Admin"]
    },
    {
      icon: Users,
      label: "Users",
      path: "/admin/users",
      roles: ["Admin"]
    }
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 pt-8">
      <nav className="px-3">
        {menuItems
          .filter(item => item.roles.includes(user?.role))
          .map(({ icon: Icon, label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 mb-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
      </nav>
    </aside>
  );
};

export default Sidebar;