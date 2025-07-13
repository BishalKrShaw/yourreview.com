import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`,
        { email }
      );
      setStatus(res.data.message);
    } catch (err) {
      setStatus("Error sending email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg text-white p-8 rounded-xl shadow-[0_4px_20px_rgba(255,255,255,0.05)]">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 transition duration-200 text-white py-2.5 rounded-md font-medium cursor-pointer"
          >
            Send Reset Link
          </button>
        </form>

        {status && (
          <p className="mt-4 text-sm text-center text-white/70">{status}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
