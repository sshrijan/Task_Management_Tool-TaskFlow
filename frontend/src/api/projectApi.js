import api from "./axios";


export const getProjects = ()=>{
    return api.get("/Projects");
}


export const createProject = (project)=>{
    return api.post("/Projects",project);
}


export const deleteProject=(id)=>{
    return api.delete(`/Projects/${id}`);
}