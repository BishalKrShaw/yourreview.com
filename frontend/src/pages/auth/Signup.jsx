import React from "react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    emailId: "",
    password: "",
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, form, {withCredentials: true});
      setMessage(res.data.message);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setMessage(err.response?.data?.ERROR || "Signup failed.");
    }
  }

  return (
    <div className="px-5 py-4 w-[500px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          placeholder="Enter first name"
          required
          className="border border-black"
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          placeholder="Enter last name"
          required
          className="border border-black"
          onChange={handleChange}
        />
        <input
          type="text"
          name="businessName"
          value={form.businessName}
          required
          placeholder="Enter your business name"
          className="border border-black"
          onChange={handleChange}
        />
        <input
          type="email"
          name="emailId"
          value={form.emailId}
          required
          placeholder="Enter email id"
          className="border border-black"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={form.password}
          required
          placeholder="Enter password"
          className="border border-black"
          onChange={handleChange}
        />
        <button className="bg-black text-white rounded cursor-pointer px-5 py-2">
          Sign up
        </button>
        {message && <p className="text-sm mt-5">{message}</p>}
      </form>
    </div>
  );
};

export default Signup;
