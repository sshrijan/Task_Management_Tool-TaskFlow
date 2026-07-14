import { useState, useEffect } from "react";
import { X } from "lucide-react";
import taskService from "../services/taskService";
import projectService from "../services/projectService";
import userService from "../services/userService";

const TaskForm = ({ task, onClose, onSuccess }) => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: 0,
    priority: 1,
    assignedToUserId: "",
    projectId: ""
  });

  useEffect(() => {
    loadData();

    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assignedToUserId: task.assignedToUserId,
        projectId: task.projectId
      });
    }
  }, [task]);

  const loadData = async () => {
    try {
      const [userRes, projectRes] = await Promise.all([
        userService.getAll(),
        projectService.getAll()
      ]);

      setUsers(userRes.data);
      setProjects(projectRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "status" ||
        name === "priority" ||
        name === "assignedToUserId" ||
        name === "projectId"
          ? Number(value)
          : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (task) {
        await taskService.update(task.id, formData);
      } else {
        await taskService.create({
          ...formData,
          status: 0
        });
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to save task");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-lg mx-4 shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-800">
          <h2 className="text-2xl font-semibold">
            {task ? "Edit Task" : "Create Task"}
          </h2>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>

            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white" value={0}>
                  Low
                </option>

                <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white" value={1}>
                  Medium
                </option>

                <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white" value={2}>
                  High
                </option>
              </select>
            </div>

            {task && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 
                  bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white" value={0}>
                    To Do
                  </option>

                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white" value={1}>
                    In Progress
                  </option>

                  <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white" value={2}>
                    Done
                  </option>
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Project
            </label>

            <select
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                value=""
              >
                Select Project
              </option>

              {projects.map((project) => (
                <option
                  key={project.projectId}
                  value={project.projectId}
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Assign User
            </label>

            <select
              name="assignedToUserId"
              value={formData.assignedToUserId}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                value=""
              >
                Select User
              </option>

              {users.map((user) => (
                <option
                  key={user.userId}
                  value={user.userId}
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 dark:border-gray-700 rounded-2xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl"
            >
              {task ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;