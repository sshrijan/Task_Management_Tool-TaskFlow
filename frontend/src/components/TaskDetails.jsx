import { X, Folder, User, Flag, Clock } from "lucide-react";

    const TaskDetails = ({ 
        task, 
        onClose, 
        onEdit, 
        onDelete 
    }) => {

  const getPriority = () => {
    if (task.priority === 2) return "High";
    if (task.priority === 1) return "Medium";
    return "Low";
  };

  const getStatus = () => {
    if (task.status === 2) return "Done";
    if (task.status === 1) return "In Progress";
    return "To Do";
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 w-full max-w-xl rounded-3xl shadow-2xl p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Task Details
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              View task information
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={24}/>
          </button>
        </div>

        <div className="space-y-6">
          <div className="max-w-full overflow-hidden">
            <h3 className="
                text-xl 
                font-semibold 
                text-gray-900 
                dark:text-white
                break-words
                line-clamp-2
            ">
                {task.title}
            </h3>

            <p className="
                text-gray-500 
                mt-2
                break-words
                whitespace-pre-wrap
                max-h-32
                overflow-y-auto
            ">
                {task.description || "No description provided"}
            </p>
            </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <Flag size={16}/>
                Priority
              </div>
              <p className="font-semibold">
                {getPriority()}
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <Clock size={16}/>
                Status
              </div>
              <p className="font-semibold">
                {getStatus()}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                    <Folder size={20}/>
                </div>

                <div className="min-w-0">
                    <p className="text-sm text-gray-500">
                        Project
                    </p>

                    <p className="font-medium break-words line-clamp-2">
                        {task.project?.name || "No project"}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                <User size={20}/>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Assigned To
                </p>
                <p className="font-medium">
                  {task.user?.name || "Unassigned"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
                onClick={() => onEdit(task)}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium"
                >
                    Edit
                </button>

                <button
                    onClick={() => {
                    onDelete(task.id);
                    onClose();
                    }}
                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-medium"
                >
                    Delete
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;