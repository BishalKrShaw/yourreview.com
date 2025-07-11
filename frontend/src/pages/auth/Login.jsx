import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    emailId: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, form, {withCredentials: true});
      setMessage(res.data.message);
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.ERROR || "Login failed.");
    }
  }

  return (
    <div className="px-5 py-4 w-[500px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="email"
          name="emailId"
          value={form.emailId}
          placeholder="Enter email id"
          className="border border-black"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="Enter password"
          className="border border-black"
          onChange={handleChange}
        />
        <button className="bg-black text-white rounded cursor-pointer px-5 py-2">
          Login
        </button>
        {message && <p className="text-sm mt-5">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
