import React, { useEffect, useState } from "react";
import axios from "axios";
import { Copy, Trash } from "lucide-react";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/campaigns`,
        {
          withCredentials: true,
        }
      );
      setCampaigns(res.data.campaigns);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this campaign?");
    if (!confirm) return;

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/campaigns/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setCampaigns(prev => prev.filter(item => item._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Your Campaigns</h1>

      {campaigns.length === 0 ? (
        <p className="text-gray-400">No campaigns found. Start by creating one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {campaigns.map((item) => (
            <div
              key={item._id}
              className="bg-white/10 p-4 rounded-lg shadow space-y-3 flex flex-col transition hover:shadow-lg"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">{item.campaignName}</h2>
                <button
                  className="cursor-pointer bg-white/30 p-2 rounded-full hover:bg-white/50 transition"
                  onClick={() => handleDelete(item._id)}
                >
                  <Trash size={16} />
                </button>
              </div>

              <p className="text-gray-400">
                {item.businessName} — {item.productOrService}
              </p>

              {/* Review Link */}
              <div>
                <p className="text-sm text-gray-400 mb-1">Review Link:</p>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={item.reviewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 underline text-sm break-all"
                  >
                    {item.reviewLink}
                  </a>
                  <button
                    onClick={() => handleCopy(item.reviewLink, item._id + "-link")}
                    className="hover:text-green-300 transition cursor-pointer"
                  >
                    <Copy size={16} />
                  </button>
                </div>
                {copiedId === item._id + "-link" && (
                  <span className="text-xs text-green-400 mt-1 block">Copied!</span>
                )}
              </div>

              {/* Script Link */}
              <div className="flex items-center justify-between pt-2">
                <a
                  href={`/campaign/${item._id}`}
                  className="text-indigo-400 hover:underline text-sm"
                >
                  View Script
                </a>
                <button
                  onClick={() =>
                    handleCopy(`${window.location.origin}/campaign/${item._id}`, item._id + "-script")
                  }
                  className="hover:text-indigo-300 transition cursor-pointer"
                >
                  <Copy size={16} />
                </button>
              </div>
              {copiedId === item._id + "-script" && (
                <span className="text-xs text-indigo-400 block">Copied!</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignList;
