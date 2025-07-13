import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CampaignReviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/reviews/campaign/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setReviews(res.data.reviews);
      }
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-8">
      <h1 className="text-2xl font-semibold mb-6">Customer Reviews</h1>

      {reviews.length === 0 ? (
        <p className="text-gray-400">No reviews found for this campaign.</p>
      ) : (
        <div className="space-y-4 max-w-2xl mx-auto">
          {reviews.map((r) => (
            <div key={r._id} className="bg-white/10 p-4 rounded-lg shadow">
              <div className="flex justify-between">
                <h3 className="font-semibold">{r.customerName}</h3>
                <span className="text-yellow-400">⭐ {r.rating}/5</span>
              </div>
              <p className="text-sm text-gray-300 mt-2">{r.comment}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(r.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignReviews;
