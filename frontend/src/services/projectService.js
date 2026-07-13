import api from "../api/axios";

const projectService = {
  getAll: () => api.get("/Projects"),
  getById: (id) => api.get(`/Projects/${id}`),
  create: (data) => api.post("/Projects", data),
  update: (id, data) => api.put(`/Projects/${id}`, data),
  delete: (id) => api.delete(`/Projects/${id}`),
};

export default projectService;