import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import UserForm from '../components/UserForm';
import userService from '../services/userService';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await userService.getAll();
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete user?")) {
      await userService.delete(id);
      fetchUsers();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Team Members</h1>
        <button
          onClick={() => { setEditingUser(null); setShowForm(true); }}
          className="bg-blue-600 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
        >
          <Plus size={20} /> Add User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <div
            key={user.userId}
            className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm hover:shadow-md transition"
          >

            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-4">
              {user.name?.[0]?.toUpperCase() || "U"}
            </div>


            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              {user.name}
            </h3>


            <p className="text-gray-500 dark:text-gray-400">
              {user.email}
            </p>


            <span
              className={`
                inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium
                ${
                  user.role === 0
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                    : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                }
              `}
            >
              {user.role === 0 ? "Admin" : "Member"}
            </span>


            <div className="mt-6 flex gap-3">

              <button
                onClick={() => {
                  setEditingUser(user);
                  setShowForm(true);
                }}
                className="
                  flex-1 py-3 
                  border border-gray-300 dark:border-gray-700
                  rounded-2xl 
                  text-sm
                  hover:bg-gray-100 
                  dark:hover:bg-gray-800
                  transition
                "
              >
                Edit
              </button>


              <button
                onClick={() => handleDelete(user.userId)}
                className="
                  flex-1 py-3
                  text-red-600
                  border border-red-200
                  dark:border-red-900
                  rounded-2xl
                  text-sm
                  hover:bg-red-50
                  dark:hover:bg-red-950/30
                  transition
                "
              >
                Delete
              </button>

            </div>

          </div>
        ))}
      </div>

      {showForm && (
        <UserForm
          user={editingUser}
          onClose={() => { setShowForm(false); setEditingUser(null); }}
          onSuccess={fetchUsers}
        />
      )}
    </div>
  );
};

export default Users;