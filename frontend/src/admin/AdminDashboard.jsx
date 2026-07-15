import { useState, useEffect } from 'react';
import { CheckSquare, FolderOpen, Users, TrendingUp } from 'lucide-react';
import taskService from '../services/taskService';

const AdminDashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));

  const [recentTasks, setRecentTasks] = useState([]);

  const [stats, setStats] = useState({
    totalTasks: 0,
    todo: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
      try {
        const res = await taskService.getAll();

        const tasks = res.data;

        setStats({
          totalTasks: tasks.length,
          todo: tasks.filter(t => t.status === 0).length,
          inProgress: tasks.filter(t => t.status === 1).length,
          completed: tasks.filter(t => t.status === 2).length,
        });

        // Latest 5 tasks
        setRecentTasks(tasks.slice(0, 5));

      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name} 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Here's an overview of your assigned tasks.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Tasks", value: stats.totalTasks, icon: CheckSquare, color: "blue" },
          { label: "To Do", value: stats.todo, icon: CheckSquare, color: "yellow" },
          { label: "In Progress", value: stats.inProgress, icon: TrendingUp, color: "blue" },
          { label: "Completed", value: stats.completed, icon: CheckSquare, color: "green" },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
                <p className="text-4xl font-semibold mt-2">{stat.value}</p>
              </div>
              <stat.icon className={`text-${stat.color}-500`} size={32} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Tasks */}
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6">
      <h2 className="text-xl font-semibold mb-6">
        Recent Tasks
      </h2>

      <div className="space-y-4">

        {recentTasks.map((task) => (

          <div
            key={task.id}
            className="flex justify-between items-center border-b dark:border-gray-800 pb-3"
          >

            <div>
              <p className="font-medium">
                {task.title}
              </p>

              <div className="flex items-center gap-3 text-sm text-gray-500">

                <span>
                  {task.project?.name || "No Project"}
                </span>

                <span>
                  • Assigned to {task.user?.name || "Unassigned"}
                </span>

              </div>

            </div>


            <span
              className={`
                px-3 py-1 rounded-full text-xs font-medium
                ${
                  task.status === 2
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : task.status === 1
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                }
              `}
            >

              {
                task.status === 2
                  ? "Done"
                  : task.status === 1
                  ? "In Progress"
                  : "To Do"
              }

            </span>


          </div>

        ))}

      </div>

    </div>
    </div>
  );
};

export default AdminDashboard;