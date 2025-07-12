import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ReviewForm = () => {
  const { id } = useParams(); // campaignId from URL
  const [form, setForm] = useState({
    customerName: '',
    customerEmailId: '',
    rating: '',
    comment: ''
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/review/${id}`,
        form
      );
      if (res.data.success) {
        setMessage({ type: 'success', text: 'Thank you! Your review was submitted.' });
        setForm({ customerName: '', customerEmailId: '', rating: '', comment: '' });
      } else {
        setMessage({ type: 'error', text: 'Submission failed. Please try again.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err?.response?.data?.ERROR || 'Something went wrong.' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center px-4 py-12">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-md p-8 space-y-6">

        <h1 className="text-2xl font-semibold text-center">Leave a Review</h1>
        <p className="text-sm text-gray-300 text-center">Your feedback helps us improve!</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-black/50 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="customerEmailId"
              value={form.customerEmailId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-black/50 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Rating (1 to 5)</label>
            <input
              type="number"
              name="rating"
              value={form.rating}
              onChange={handleChange}
              required
              min="1"
              max="5"
              className="w-full px-4 py-2 rounded-md bg-black/50 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="5"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Comment</label>
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 rounded-md bg-black/50 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write your review..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2 rounded-md transition cursor-pointer"
          >
            Submit Review
          </button>

          {message && (
            <p
              className={`text-sm text-center mt-3 ${
                message.type === 'success' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {message.text}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
