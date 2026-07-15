import { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import userService from "../services/userService";

const UserForm = ({ user, onClose, onSuccess }) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    passwordHash: "",
    role: "Member"
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        passwordHash: "",
        role: user.role
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await userService.update(user.userId, formData);
      } else {
        await userService.create(formData);
      }
      onSuccess();
      onClose();

    } catch(error) {
      console.error(error);

      if(error.response?.status === 400)
      {
        alert(error.response.data);
      }
      else
      {
        alert("Failed to save user");
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md p-8">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-semibold">
            {user ? "Edit User" : "Add New User"}
          </h2>
          <button onClick={onClose}>
            <X size={24}/>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              value={formData.name}
              onChange={(e)=>setFormData({
                ...formData,
                name:e.target.value
              })}
              className="w-full px-4 py-3 rounded-2xl border dark:border-gray-700 bg-white dark:bg-gray-800"
              required
            />
          </div>


          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              value={formData.email}
              onChange={(e)=>setFormData({
                ...formData,
                email:e.target.value
              })}
              className="w-full px-4 py-3 rounded-2xl border dark:border-gray-700 bg-white dark:bg-gray-800"
              required
            />
          </div>


          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={
                  user
                    ? "New Password"
                    : "Enter password"
                }
                value={formData.passwordHash}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    passwordHash: e.target.value
                  })
                }
                className="w-full px-4 py-3 pr-12 rounded-2xl border dark:border-gray-700 bg-white dark:bg-gray-800"
                required={!user}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
              </button>
            </div>
          </div>


          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Role
            </label>

            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value
                })
              }
              className="
                w-full px-4 py-3 rounded-2xl
                border border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            >
              <option value="Admin">
                Admin
              </option>

              <option value="Member">
                Member
              </option>

            </select>
          </div>


          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border rounded-2xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl"
            >
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};


export default UserForm;