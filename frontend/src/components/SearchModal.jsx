import { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import taskService from "../services/taskService";
import projectService from "../services/projectService";
import userService from "../services/userService";
import { useSearch } from "../context/SearchContext";

const SearchModal = () => {

  const { setOpenSearch } = useSearch();

  const [query, setQuery] = useState("");

  const [results, setResults] = useState({
    tasks: [],
    projects: [],
    users: []
  });


  useEffect(() => {
    loadData();
  }, []);


  const loadData = async () => {
    try {

      const user = JSON.parse(localStorage.getItem("user"));

      let taskRes;

      if(user.role === "Admin"){
        taskRes = await taskService.getAll();
      }
      else{
        taskRes = await taskService.getByUser(user.userId);
      }


      const projectRes = await projectService.getAll();


      let userRes = null;

      if(user.role === "Admin"){
        userRes = await userService.getAll();
      }


      setResults({
        tasks: taskRes.data,
        projects: projectRes.data,
        users: userRes?.data || []
      });


    } catch(error){
      console.error(error);
    }
  };


  const filteredTasks = results.tasks.filter(task =>
    task.title
      .toLowerCase()
      .includes(query.toLowerCase())
  );


  const filteredProjects = results.projects.filter(project =>
    project.name
      .toLowerCase()
      .includes(query.toLowerCase())
  );


  const filteredUsers = results.users.filter(user =>
    user.name
      .toLowerCase()
      .includes(query.toLowerCase())
  );


  return (
    <div className="
      fixed inset-0 
      bg-black/50
      flex items-start justify-center
      pt-24
      z-50
    ">

      <div className="
        bg-white
        dark:bg-gray-900
        w-full
        max-w-xl
        rounded-3xl
        p-6
      ">


        <div className="flex items-center gap-3">

          <Search size={20}/>

          <input
            autoFocus
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="Search..."
            className="
              flex-1
              bg-transparent
              outline-none
            "
          />


          <button
            onClick={()=>setOpenSearch(false)}
          >
            <X/>
          </button>

        </div>



        <div className="mt-6 space-y-4">

  {!query ? (
    <p className="text-gray-500 text-center py-6">
      Start typing to search...
    </p>
  ) : (
    <>
      {filteredTasks.map(task => (
        <div
            key={task.id}
            className="
                p-3
                rounded-xl
                hover:bg-gray-100
                dark:hover:bg-gray-800
                max-w-full
                overflow-hidden
            "
            >
            <p
                className="
                font-semibold
                truncate
                max-w-full
                "
            >
                {task.title}
            </p>

            <p className="text-sm text-gray-500">
                Task
            </p>
            </div>
      ))}


      {filteredProjects.map(project => (
        <div
            key={project.projectId}
            className="
                p-3
                rounded-xl
                hover:bg-gray-100
                dark:hover:bg-gray-800
                max-w-full
                overflow-hidden
            "
            >
            <p
                className="
                font-semibold
                truncate
                max-w-full
                "
            >
                {project.name}
            </p>

            <p className="text-sm text-gray-500">
                Project
            </p>
            </div>
      ))}


      {filteredUsers.map(user => (
        <div
            key={user.userId}
            className="
                p-3
                rounded-xl
                hover:bg-gray-100
                dark:hover:bg-gray-800
                max-w-full
                overflow-hidden
            "
            >
            <p
                className="
                font-semibold
                truncate
                max-w-full
                "
            >
                {user.name}
            </p>

            <p className="text-sm text-gray-500">
                User
            </p>
            </div>
      ))}


      {filteredTasks.length === 0 &&
       filteredProjects.length === 0 &&
       filteredUsers.length === 0 && (
        <p className="text-gray-500 text-center py-6">
          No results found
        </p>
      )}

    </>
  )}

</div>


      </div>

    </div>
  );
};


export default SearchModal;