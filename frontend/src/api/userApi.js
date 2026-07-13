import api from "./axios";


export const getUsers = () => {
    return api.get("/Users");
};


export const createUser = (user) => {
    return api.post("/Users", user);
};


export const updateUser = (id,user) => {
    return api.put(`/Users/${id}`,user);
};


export const deleteUser = (id)=>{
    return api.delete(`/Users/${id}`);
};