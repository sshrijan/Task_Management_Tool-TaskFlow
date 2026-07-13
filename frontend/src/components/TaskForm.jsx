import { useState, useEffect } from 'react';
import taskService from '../services/taskService';
import { X } from 'lucide-react';

const TaskForm = ({ task, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 0,
    priority: 1,
    assignedToUserId: 1,
    projectId: 1,
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task) {
        await taskService.update(task.id, formData);
      } else {
        await taskService.create(formData);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving task", error);
      alert("Failed to save task");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'status' || name === 'priority' || name === 'assignedToUserId' || name === 'projectId'
        ? parseInt(value)
        : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-lg mx-4 shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-800">
          <h2 className="text-2xl font-semibold">{task ? 'Edit Task' : 'Create New Task'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
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
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-transparent"
              >
                <option value={0}>To Do</option>
                <option value={1}>In Progress</option>
                <option value={2}>Done</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-transparent"
              >
                <option value={0}>Low</option>
                <option value={1}>Medium</option>
                <option value={2}>High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Project ID</label>
              <input
                type="number"
                name="projectId"
                value={formData.projectId}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Assign To User ID</label>
              <input
                type="number"
                name="assignedToUserId"
                value={formData.assignedToUserId}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-700 rounded-2xl font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium transition-all"
            >
              {task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;