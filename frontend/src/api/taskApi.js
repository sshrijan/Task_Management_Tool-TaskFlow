import api from "./axios";


export const getTasks=()=>{
    return api.get("/Task");
}


export const createTask=(task)=>{
    return api.post("/Task",task);
}


export const updateTask=(id,task)=>{
    return api.put(`/Task/${id}`,task);
}


export const deleteTask=(id)=>{
    return api.delete(`/Task/${id}`);
}