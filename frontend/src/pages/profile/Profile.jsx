import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Profile = () => {
  // // Dummy data for now
  // const profile = {
  //   firstName: 'John',
  //   lastName: 'Doe',
  //   business: 'Acme Corp',
  //   email: 'john.doe@example.com'
  // };

  const [profile, setProfile] = useState('');

  const getProfile = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/profile`, {withCredentials: true});
      setProfile(res.data.user);
      console.log(res.data);
    } catch (error) {
      setProfile('');
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Your Profile</h1>
        <p className="text-sm text-gray-400 mt-1">Manage your personal and business information</p>
      </div>

      {/* Profile Info */}
      <div className="bg-black backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-md max-w-xl space-y-6">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Full Name</label>
          <p className="text-lg font-medium">
            {profile.firstName} {profile.lastName}
          </p>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Business Name</label>
          <p className="text-lg font-medium">{profile.businessName}</p>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <p className="text-lg font-medium">{profile.emailId}</p>
        </div>

        <div className="flex gap-4 pt-4">
          <NavLink
            to="/edit-profile"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md text-sm font-medium transition"
          >
            Edit Profile
          </NavLink>
          <NavLink
            to="/change-password"
            className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-md text-sm font-medium transition"
          >
            Change Password
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Profile;
