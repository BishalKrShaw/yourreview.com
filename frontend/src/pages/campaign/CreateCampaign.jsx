import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateCampaign = () => {
  const [form, setForm] = useState({
    campaignName: '',
    businessName: '',
    productOrService: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/campaigns/create-campaign`, form, {
        withCredentials: true
      });

      if (res.data.success) {
        navigate('/campaigns');
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="bg-black min-h-screen text-white px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Create a New Campaign</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <div>
          <label className="block mb-1 text-gray-300">Campaign Name</label>
          <input
            type="text"
            name="campaignName"
            value={form.campaignName}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-white/10 text-white border border-gray-700"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-300">Business Name</label>
          <input
            type="text"
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-white/10 text-white border border-gray-700"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-300">Product or Service</label>
          <input
            type="text"
            name="productOrService"
            value={form.productOrService}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-white/10 text-white border border-gray-700"
          />
        </div>
        <button
          type="submit"
          className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded cursor-pointer"
        >
          Create Campaign
        </button>
      </form>
    </div>
  )
}

export default CreateCampaign
