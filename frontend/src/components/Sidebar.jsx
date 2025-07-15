import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { clearUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Menu, X } from "lucide-react"; // You can replace with your icon library

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
        null,
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(clearUser());
        navigate("/login", { replace: true });
        window.location.reload();
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      navigate("/dashboard");
    }
  };

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md hover:bg-white/10 transition ${
      isActive ? "bg-white/10 text-white" : "text-white/80"
    }`;

  return (
    <>
      {/* Toggle button for mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsOpen(true)} className="text-white bg-white/10 p-2 rounded-md">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar for desktop */}
      <aside className="hidden md:flex min-h-screen w-64 px-6 py-8 bg-white/5 backdrop-blur-md border-r border-white/10 text-white flex-col gap-6 shadow-[0_8px_30px_rgba(255,255,255,0.05)]">
        <h2 className="text-2xl font-semibold mb-6">YourReview</h2>

        <nav className="flex flex-col gap-4 text-sm font-medium">
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/campaigns" className={navLinkClass}>
            Campaigns
          </NavLink>
          <NavLink to="/create-campaign" className={navLinkClass}>
            Create Campaign
          </NavLink>
          <NavLink to="/profile" className={navLinkClass}>
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

      {/* Sidebar drawer for mobile */}
      {isOpen && (
        <>
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 z-40"
          ></div>
          <div className="fixed top-0 left-0 w-64 h-full px-6 py-8 bg-[#111] backdrop-blur-md border-r border-white/10 text-white flex flex-col gap-6 z-50 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">YourReview</h2>
              <button onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-4 text-sm font-medium">
              <NavLink to="/dashboard" className={navLinkClass} onClick={() => setIsOpen(false)}>
                Dashboard
              </NavLink>
              <NavLink to="/campaigns" className={navLinkClass} onClick={() => setIsOpen(false)}>
                Campaigns
              </NavLink>
              <NavLink to="/create-campaign" className={navLinkClass} onClick={() => setIsOpen(false)}>
                Create Campaign
              </NavLink>
              <NavLink to="/profile" className={navLinkClass} onClick={() => setIsOpen(false)}>
                Profile
              </NavLink>
            </nav>

            <div className="mt-auto">
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="w-full px-4 py-2 rounded-md bg-white/10 text-white/80 hover:bg-white/20 transition text-sm cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
