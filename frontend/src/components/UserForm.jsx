import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import userService from '../services/userService';

const UserForm = ({ user, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      await userService.update(user.id, formData);
    } else {
      await userService.create(formData);
    }
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md p-8">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-semibold">{user ? 'Edit User' : 'Add New User'}</h2>
          <button onClick={onClose}><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border dark:border-gray-700"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border dark:border-gray-700"
            required
          />

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 border rounded-2xl">Cancel</button>
            <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-2xl">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;