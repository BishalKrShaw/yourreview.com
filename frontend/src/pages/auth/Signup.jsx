import React from "react";
import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    emailId: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Sending...");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/signup`,
        form,
        { withCredentials: true }
      );
      setMessage(res.data.message);
    } catch (err) {
      console.log(err);
      setMessage(err.response?.data?.ERROR || "Signup failed.");
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen flex-col bg-black px-4">
      <header className="text-white text-xl font-semibold text-center mb-6">
        <NavLink to="/">YourReview</NavLink>
      </header>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-5 p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgba(255,255,255,0.05)] text-white"
      >
        <h2 className="text-2xl font-semibold text-white text-center">
          Create your account
        </h2>

        <input
          type="text"
          name="firstName"
          value={form.firstName}
          placeholder="First name"
          required
          className="bg-white/10 text-white placeholder-white/60 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
          onChange={handleChange}
        />

        <input
          type="text"
          name="lastName"
          value={form.lastName}
          placeholder="Last name"
          required
          className="bg-white/10 text-white placeholder-white/60 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
          onChange={handleChange}
        />

        <input
          type="text"
          name="businessName"
          value={form.businessName}
          required
          placeholder="Business name"
          className="bg-white/10 text-white placeholder-white/60 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
          onChange={handleChange}
        />

        <input
          type="email"
          name="emailId"
          value={form.emailId}
          required
          placeholder="Email address"
          className="bg-white/10 text-white placeholder-white/60 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          value={form.password}
          required
          placeholder="Password"
          className="bg-white/10 text-white placeholder-white/60 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/21 transition"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="mt-2 bg-white text-black font-medium rounded-full py-2 hover:bg-white/90 transition cursor-pointer"
        >
          Sign up
        </button>

        {message && (
          <p className="text-sm mt-2 text-center text-white/80">{message}</p>
        )}

        <p className="text-sm text-center mt-4 text-white/60">
          Already have an account?{" "}
          <span
            className="text-white underline cursor-pointer hover:text-white/90"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
