import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/reset-password/${token}`,
        { password }
      );
      setStatus("Password reset successful. Redirecting...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setStatus("Invalid or expired link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg text-white p-8 rounded-xl shadow-[0_4px_20px_rgba(255,255,255,0.05)]">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Reset Password
        </h2>

        <form onSubmit={handleReset} className="space-y-5">
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 transition duration-200 text-white py-2.5 rounded-md font-medium"
          >
            Reset Password
          </button>
        </form>

        {status && (
          <p className="mt-4 text-sm text-center text-white/70">{status}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
