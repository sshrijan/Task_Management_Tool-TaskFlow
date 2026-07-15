import api from "../api/axios";

// Note: TaskController resolves to "/api/task" (singular) —
// rename the controller to "TasksController" and update below if you fix that.
const taskService = {
  getAll: () => api.get("/task"),
  getById: (id) => api.get(`/task/${id}`),
  create: (data) => api.post("/task", data),
  update: (id, data) => api.put(`/task/${id}`, data),
  delete: (id) => api.delete(`/task/${id}`),
  getByUser(userId) {
    return api.get(`/task/user/${userId}`);
}
};

export default taskService;