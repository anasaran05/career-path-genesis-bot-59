import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const ProfileCard = () => {
  const { userProfile, signOut, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    phone: userProfile?.phone || '',
    location: userProfile?.location || '',
    role: userProfile?.role || '',
    industryFocus: userProfile?.industryFocus || '',
    experience: userProfile?.experience || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { error } = await updateProfile(formData);
    if (!error) {
      setEditing(false);
    }
  };

  if (!userProfile && !editing) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-card bg-white rounded-2xl shadow-md p-6 w-full max-w-md backdrop-blur-sm bg-gradient-to-r from-white/70 to-white/50">
      <h2 className="text-xl font-semibold mb-4">👤 Your Profile</h2>
      {editing ? (
        <div className="space-y-2 text-gray-700">
          <label className="block">
            <span className="font-semibold">Name:</span>
            <input name="name" value={formData.name} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </label>
          <label className="block">
            <span className="font-semibold">Email:</span>
            <input name="email" value={formData.email} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </label>
          <label className="block">
            <span className="font-semibold">Phone:</span>
            <input name="phone" value={formData.phone} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </label>
          <label className="block">
            <span className="font-semibold">Location:</span>
            <input name="location" value={formData.location} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </label>
          <label className="block">
            <span className="font-semibold">Role:</span>
            <input name="role" value={formData.role} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </label>
          <label className="block">
            <span className="font-semibold">Industry Focus:</span>
            <input name="industryFocus" value={formData.industryFocus} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </label>
          <label className="block">
            <span className="font-semibold">Experience:</span>
            <input name="experience" value={formData.experience} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </label>
          <div className="mt-6 flex gap-3">
            <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save</button>
            <button onClick={() => setEditing(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-2 text-gray-700">
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Location:</strong> {formData.location}</p>
            <p><strong>Role:</strong> {formData.role}</p>
            <p><strong>Industry Focus:</strong> {formData.industryFocus}</p>
            <p><strong>Experience:</strong> {formData.experience}</p>
          </div>
          <div className="mt-6 flex gap-3">
            <button onClick={() => setEditing(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Update Info</button>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">Change Password</button>
            <button onClick={signOut} className="ml-auto px-4 py-2 bg-red-500 text-white rounded-lg">Logout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileCard;