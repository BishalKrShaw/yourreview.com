import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState('');
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/profile`, {
        withCredentials: true
      });
      setProfile(res.data.user);
    } catch (error) {
      setProfile('');
    }
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm("Are you sure you want to permanently delete your account?");
    if (!confirm) return;

    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/auth/delete-account`, {
        withCredentials: true
      });
      if (res.data.success) {
        alert("Account deleted successfully");
        navigate("/login", { replace: true });
        window.location.reload();
      }
    } catch (error) {
      console.error("Account deletion failed:", error);
      alert("Something went wrong while deleting your account.");
    }
  };

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

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          {/* <NavLink
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
          </NavLink> */}

          <NavLink
            to="/forgot-password"
            className="bg-yellow-700 hover:bg-yellow-800 text-white px-5 py-2 rounded-md text-sm font-medium transition"
          >
            Forgot Password
          </NavLink>

          <button
            onClick={handleDeleteAccount}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md text-sm font-medium transition cursor-pointer"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
