import React from 'react';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  const campaigns = [
    { name: "Summer Sale", createdOn: "Jul 5", reviews: 18, status: "Active" },
    { name: "Winter Launch", createdOn: "Jun 20", reviews: 10, status: "Paused" },
    { name: "Flash Offer", createdOn: "May 30", reviews: 5, status: "Active" }
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-4 sm:px-6 lg:px-8 py-8 space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">
          Welcome, <span className="text-indigo-400">Your Business Name</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">Your performance overview and recent activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Total Campaigns", value: "5" },
          { label: "Total Reviews", value: "123" },
          { label: "Avg Rating", value: "4.7" }
        ].map((item, index) => (
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
              {campaigns.map((c, i) => (
                <tr key={i} className="border-b border-gray-900 hover:bg-gray-900 transition">
                  <td className="py-3">{c.name}</td>
                  <td className="py-3">{c.createdOn}</td>
                  <td className="py-3">{c.reviews}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      c.status === "Active" ? "bg-green-700/50 text-green-300" : "bg-yellow-700/50 text-yellow-300"
                    }`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
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
