import { useState, useEffect } from "react";
import { Plus, List, Grid3X3 } from "lucide-react";
import TaskForm from "../components/TaskForm";
import taskService from "../services/taskService";
import TaskDetails from "../components/TaskDetails";



const statusColumns = [
  {
    id: 0,
    title: "To Do",
    color: "bg-yellow-500"
  },
  {
    id: 1,
    title: "In Progress",
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Done",
    color: "bg-green-500"
  }
];

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("board");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDragging, setIsDragging] = useState(false);


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

  const handleDragStart = (e, task) => {
    setIsDragging(true);
    e.dataTransfer.setData("taskId", task.id);
  };

  const handleDragEnd = () => {
    setTimeout(() => {
      setIsDragging(false);
    }, 100);
  };

  const handleTaskClick = (task) => {
    if (!isDragging) {
      setSelectedTask(task);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, status) => {
    e.preventDefault();

    const taskId = Number(
      e.dataTransfer.getData("taskId")
    );

    const task = tasks.find(t => t.id === taskId);

    if (!task || task.status === status) return;

    try {
      await taskService.update(task.id, {
        ...task,
        status
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await taskService.delete(id);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const getTasks = (status) =>
    tasks.filter(task => task.status === status);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Tasks
          </h1>

          <p className="text-gray-500">
            Manage project tasks
          </p>
        </div>

        <button
          onClick={() => {
            setEditingTask(null);
            setShowForm(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
        >
          <Plus size={20} />
          New Task
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setView("board")}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 ${
            view === "board"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-800"
          }`}
        >
          <Grid3X3 size={18} />
          Board
        </button>

        <button
          onClick={() => setView("list")}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 ${
            view === "list"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-800"
          }`}
        >
          <List size={18} />
          List
        </button>
      </div>

      {view === "board" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {statusColumns.map(column => (
            <div
              key={column.id}
              onDragOver={handleDragOver}
              onDrop={(e) =>
                handleDrop(e, column.id)
              }
              className="bg-white dark:bg-gray-900 rounded-3xl p-5 min-h-[600px]"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${column.color}`}
                  />

                  <h2 className="font-semibold">
                    {column.title}
                  </h2>
                </div>

                <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
                  {getTasks(column.id).length}
                </span>
              </div>

              <div className="space-y-4">
                {getTasks(column.id).map(task => (
                  <div
                    key={task.id}
                    draggable
                    onClick={() => handleTaskClick(task)}
                    onDragStart={(e) => handleDragStart(e, task)}
                    onDragEnd={handleDragEnd}
                    className="
                    border border-gray-200 dark:border-gray-700 
                    rounded-2xl p-4 
                    bg-white dark:bg-gray-800 
                    shadow-sm hover:shadow-md 
                    transition cursor-grab active:cursor-grabbing
                    overflow-hidden
                    "
                    >
                    <h3 className="font-semibold break-words line-clamp-2">
                      {task.title}
                    </h3>

                    <div className="flex items-center gap-2 mt-3">

                    <div className="
                        w-7 h-7 
                        rounded-full 
                        bg-blue-500 
                        text-white 
                        flex items-center justify-center
                        text-xs font-semibold
                        ">
                        {task.user?.name?.charAt(0).toUpperCase() || "U"}
                      </div>

                      <span className="text-sm text-gray-500">
                        {task.user?.name || "Unassigned"}
                      </span>

                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            task.priority === 2
                              ? "bg-red-100 text-red-700"
                              : task.priority === 1
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-600"
                            }`}
                          >
                          {task.priority === 2
                          ? "High"
                          : task.priority === 1
                          ? "Medium"
                          : "Low"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "list" && (
        <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden">

          <table className="w-full table-fixed">
            <thead className="border-b dark:border-gray-800">
              <tr>
                <th className="text-left p-4 w-1/4">
                  Task
                </th>

                <th className="text-left p-4 w-1/5">
                  Project
                </th>

                <th className="text-left p-4 w-1/5">
                  Assigned To
                </th>

                <th className="text-left p-4 w-1/6">
                  Priority
                </th>

                <th className="text-left p-4 w-1/6">
                  Status
                </th>
              </tr>
            </thead>


            <tbody>

              {tasks.map(task => (

                <tr
                  key={task.id}
                  onClick={() => handleTaskClick(task)}
                  className="
                    border-b dark:border-gray-800
                    hover:bg-gray-50 dark:hover:bg-gray-800
                    cursor-pointer
                    transition
                  "
                >

                  <td className="p-4 align-top">
                    <div className="max-w-xs overflow-hidden">

                      <p className="font-semibold break-words line-clamp-1">
                        {task.title}
                      </p>

                      <p className="text-sm text-gray-500 mt-1 break-words line-clamp-2">
                        {task.description || "No description"}
                      </p>

                    </div>
                  </td>


                  <td className="p-4 align-top">
                    <p className="break-words line-clamp-2">
                      {task.project?.name || "No Project"}
                    </p>
                  </td>


                  <td className="p-4">
                    <div className="flex items-center gap-2">

                      <div className="
                        w-8 h-8 rounded-full 
                        bg-blue-500 
                        text-white 
                        flex items-center justify-center
                        text-sm font-semibold
                      ">
                        {task.user?.name?.charAt(0)}
                      </div>

                      <span>
                        {task.user?.name || "Unassigned"}
                      </span>

                    </div>
                  </td>


                  <td className="p-4">

                    <span
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${
                          task.priority === 2
                          ? "bg-red-100 text-red-700"
                          : task.priority === 1
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-100 text-gray-700"
                        }
                      `}
                    >
                      {
                        task.priority === 2
                        ? "High"
                        : task.priority === 1
                        ? "Medium"
                        : "Low"
                      }

                    </span>

                  </td>


                  <td className="p-4">

                    <span
                      className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${
                          task.status === 2
                          ? "bg-green-100 text-green-700"
                          : task.status === 1
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
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

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

      {showForm && (
        <TaskForm
          task={editingTask}
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
          onSuccess={fetchTasks}
        />
      )}

      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onEdit={(task) => {
            setEditingTask(task);
            setShowForm(true);
            setSelectedTask(null);
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Tasks;