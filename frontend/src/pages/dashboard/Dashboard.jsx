import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    totalReviews: 0,
    campaignSummaries: []
  });

  const navigate = useNavigate();

  const data = useSelector((store) => store.auth.user);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/dashboard`, {
          withCredentials: true
        });
        if (res.data.success) {
          setStats(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-4 sm:px-6 lg:px-8 py-8 space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">
          Welcome, <span className="text-indigo-400">{data.firstName}</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">Your performance overview and recent activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[{
          label: "Total Campaigns",
          value: stats.totalCampaigns
        }, {
          label: "Total Reviews",
          value: stats.totalReviews
        }, {
          label: "Avg Rating",
          value: "—" // Placeholder for future
        }].map((item, index) => (
          <div key={index} className="bg-black/80 border border-gray-800 rounded-xl p-5 shadow-md backdrop-blur-sm">
            <h2 className="text-sm text-gray-400">{item.label}</h2>
            <p className="text-3xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Campaigns Table */}
      <div className="bg-black/80 border border-gray-800 rounded-xl p-6 shadow-md backdrop-blur-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Campaigns</h2>
          <NavLink to="/campaigns" className="text-indigo-400 hover:underline text-sm">
            View All →
          </NavLink>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="pb-2 text-left">Name</th>
                <th className="pb-2 text-left">Created</th>
                <th className="pb-2 text-left">Reviews</th>
                <th className="pb-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.campaignSummaries.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-4 text-gray-500 text-center">No campaigns yet.</td>
                </tr>
              ) : (
                stats.campaignSummaries.map((c) => (
                  <tr
                    key={c._id}
                    onClick={() => navigate(`/campaign/${c._id}/reviews`)}
                    className="border-b border-gray-900 hover:bg-gray-900 transition cursor-pointer"
                  >
                    <td className="py-3">{c.campaignName}</td>
                    <td className="py-3">{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td className="py-3">{c.reviewCount}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          c.reviewCount > 0
                            ? "bg-green-700/50 text-green-300"
                            : "bg-yellow-700/50 text-yellow-300"
                        }`}
                      >
                        {c.reviewCount > 0 ? "Active" : "No Reviews"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <NavLink
          to="/create-campaign"
          className="bg-white/10 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
        >
          Create Campaign
        </NavLink>
      </div>
    </div>
  );
};

export default Dashboard;
