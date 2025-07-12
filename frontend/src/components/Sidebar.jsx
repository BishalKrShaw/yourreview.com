import axios from "axios";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
        null,
        { withCredentials: true }
      );
      console.log(res.data);
      if (res.data.success) {
        navigate("/login", { replace: true });
        window.location.reload();
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      navigate("/dashboard");
    }
  };

  return (
    <aside className="min-h-screen w-64 px-6 py-8 bg-white/5 backdrop-blur-md border-r border-white/10 text-white flex flex-col gap-6 shadow-[0_8px_30px_rgba(255,255,255,0.05)]">
      <h2 className="text-2xl font-semibold mb-6">YourReview</h2>

      <nav className="flex flex-col gap-4 text-sm font-medium">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md hover:bg-white/10 transition ${
              isActive ? "bg-white/10 text-white" : "text-white/80"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/campaigns"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md hover:bg-white/10 transition ${
              isActive ? "bg-white/10 text-white" : "text-white/80"
            }`
          }
        >
          Campaigns
        </NavLink>

        <NavLink
          to="/create-campaign"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md hover:bg-white/10 transition ${
              isActive ? "bg-white/10 text-white" : "text-white/80"
            }`
          }
        >
          Create Campaign
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md hover:bg-white/10 transition ${
              isActive ? "bg-white/10 text-white" : "text-white/80"
            }`
          }
        >
          Profile
        </NavLink>
      </nav>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 rounded-md bg-white/10 text-white/80 hover:bg-white/20 transition text-sm cursor-pointer"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
