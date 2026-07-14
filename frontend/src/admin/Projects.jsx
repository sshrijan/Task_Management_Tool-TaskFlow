import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import ProjectForm from '../components/ProjectForm';
import projectService from '../services/projectService';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await projectService.getAll();
      setProjects(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this project?")) {
      await projectService.delete(id);
      fetchProjects();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="text-gray-500">Manage your ongoing projects</p>
        </div>
        <button
          onClick={() => { setEditingProject(null); setShowForm(true); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
        >
          <Plus size={20} />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div 
            key={project.projectId} 
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start gap-3">

              <h3 className="text-xl font-semibold break-words line-clamp-2">
                {project.name || `Project ${project.projectId}`}
              </h3>
            </div>

            <p className="text-gray-500 mt-3 line-clamp-3 break-words">
              {project.description || "No description provided"}
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => handleEdit(project)}
                className="flex-1 py-3 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(project.projectId)}
                className="flex-1 py-3 text-sm font-medium text-red-600 border border-transparent rounded-2xl hover:bg-red-50 dark:hover:bg-red-950/30 transition"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={() => { setShowForm(false); setEditingProject(null); }}
          onSuccess={fetchProjects}
        />
      )}
    </div>
  );
};

export default Projects;