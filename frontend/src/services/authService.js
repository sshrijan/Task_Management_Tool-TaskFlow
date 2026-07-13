import api from "../api/axios";

const authService = {
    login: (data) => api.post("/Auth/login", data)
};

export default authService;