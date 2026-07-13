import api from "../api/axios";

// Each method returns the full axios response (so components can use res.data),
// matching how Users.jsx / UserForm.jsx call this service.
const userService = {
  getAll: () => api.get("/Users"),
  getById: (id) => api.get(`/Users/${id}`),
  create: (data) => api.post("/Users", data),
  update: (id, data) => api.put(`/Users/${id}`, data),
  delete: (id) => api.delete(`/Users/${id}`),
};

export default userService;