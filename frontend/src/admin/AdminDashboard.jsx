import { useState, useEffect } from 'react';
import { CheckSquare, FolderOpen, Users, TrendingUp } from 'lucide-react';
import taskService from '../services/taskService';

const AdminDashboard = () => {
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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Welcome back 👋</h1>

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
        <h2 className="text-xl font-semibold mb-6">Recent Tasks</h2>
        {/* You can expand this with actual recent tasks list */}
        <p className="text-gray-500">Recent tasks will appear here...</p>
      </div>
    </div>
  );
};

export default AdminDashboard;