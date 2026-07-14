import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import projectService from '../services/projectService';

const ProjectForm = ({ project, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (project) setFormData(project);
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (project) {
        await projectService.update(project.projectId, formData);
      } else {
        await projectService.create(formData);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md p-8">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-semibold">{project ? 'Edit Project' : 'New Project'}</h2>
          <button onClick={onClose}><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium">Project Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-2xl border dark:border-gray-700 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 rounded-2xl border dark:border-gray-700 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3.5 border rounded-2xl">Cancel</button>
            <button type="submit" className="flex-1 py-3.5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700">
              {project ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;