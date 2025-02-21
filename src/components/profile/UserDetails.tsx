"use client";

import { useState } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';
import { showNotification } from '../ui/Notifications';

interface UserData {
  name: string;
  email: string;
  phone: string;
}

export default function UserDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+92 300 1234567',
  });

  const handleSave = async () => {
    try {
      // API call to update user data would go here
      // await updateUserData(userData);
      setIsEditing(false);
      showNotification.success('Profile updated successfully');
    } catch {
      showNotification.error('Failed to update profile');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Profile Details</h2>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
        >
          {isEditing ? (
            <>
              <FaSave className="w-4 h-4" />
              Save Changes
            </>
          ) : (
            <>
              <FaEdit className="w-4 h-4" />
              Edit Profile
            </>
          )}
        </button>
      </div>

      <div className="grid gap-6">
        {Object.entries(userData).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {key}
            </label>
            {isEditing ? (
              <input
                type={key === 'email' ? 'email' : 'text'}
                value={value}
                onChange={(e) => setUserData({ ...userData, [key]: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            ) : (
              <p className="px-4 py-2 bg-gray-50 rounded-lg text-gray-900">{value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 