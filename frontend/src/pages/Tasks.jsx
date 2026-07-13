import { useState, useEffect } from 'react';
import { Plus, List, Grid3X3 } from 'lucide-react';
import TaskForm from '../components/TaskForm';
import taskService from '../services/taskService';

const statusColumns = [
  { id: 0, title: "To Do", color: "yellow" },
  { id: 1, title: "In Progress", color: "blue" },
  { id: 2, title: "Done", color: "green" },
];

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState('kanban'); // default to kanban
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await taskService.getAll();
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Drag & Drop Handlers
  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData("taskId"));
    
    const taskToUpdate = tasks.find(t => t.id === taskId);
    if (taskToUpdate && taskToUpdate.status !== newStatus) {
      try {
        await taskService.update(taskId, { ...taskToUpdate, status: newStatus });
        fetchTasks(); // Refresh
      } catch (error) {
        console.error("Failed to update task status", error);
      }
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this task?")) {
      await taskService.delete(id);
      fetchTasks();
    }
  };

  const getTasksByStatus = (status) => tasks.filter(task => task.status === status);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tasks</h1>
          <p className="text-gray-500 dark:text-gray-400">Drag tasks between columns to update status</p>
        </div>

        <button
          onClick={() => { setEditingTask(null); setShowForm(true); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-medium"
        >
          <Plus size={20} />
          New Task
        </button>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 bg-white dark:bg-gray-900 p-1 rounded-2xl w-fit">
        <button
          onClick={() => setView('list')}
          className={`px-5 py-2 rounded-xl flex items-center gap-2 ${view === 'list' ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
        >
          <List size={18} /> List
        </button>
        <button
          onClick={() => setView('kanban')}
          className={`px-5 py-2 rounded-xl flex items-center gap-2 ${view === 'kanban' ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
        >
          <Grid3X3 size={18} /> Kanban
        </button>
      </div>

      {/* Kanban View */}
      {view === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statusColumns.map(column => (
            <div
              key={column.id}
              className="bg-white dark:bg-gray-900 rounded-3xl p-5 min-h-[600px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full bg-${column.color}-500`}></span>
                  {column.title}
                </h3>
                <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                  {getTasksByStatus(column.id).length}
                </span>
              </div>

              <div className="space-y-4">
                {getTasksByStatus(column.id).map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm cursor-move hover:shadow-md transition-all"
                  >
                    <h4 className="font-medium leading-tight">{task.title}</h4>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{task.description}</p>

                    <div className="flex justify-between items-center mt-4">
                      <span className={`text-xs px-3 py-1 rounded-full 
                        ${task.priority === 2 ? 'bg-red-100 text-red-700' : 
                          task.priority === 1 ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'}`}>
                        {task.priority === 2 ? 'High' : task.priority === 1 ? 'Medium' : 'Low'}
                      </span>

                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(task)} className="text-blue-600 text-sm hover:underline">Edit</button>
                        <button onClick={() => handleDelete(task.id)} className="text-red-600 text-sm hover:underline">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View (kept for reference) */}
      {view === 'list' && (
        <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden">
          {/* Same table as before - you can keep or remove */}
          <p className="p-8 text-center text-gray-500">List view coming soon...</p>
        </div>
      )}

      {/* Task Form Modal */}
      {showForm && (
        <TaskForm
          task={editingTask}
          onClose={() => { setShowForm(false); setEditingTask(null); }}
          onSuccess={fetchTasks}
        />
      )}
    </div>
  );
};

export default Tasks;