import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="w-full px-5 py-4 flex justify-between items-center border-t border-white/10 text-white bg-black backdrop-blur-md shadow-[0_-4px_20px_rgba(255,255,255,0.05)]">
      <p className="text-white/70 font-light">YourReview &copy; All rights reserved</p>
      <div className="flex items-center gap-6">
        <NavLink to="/privacy-policy" className="text-sm font-light text-white/40">Privacy Policy</NavLink>
        <NavLink to="/terms-conditions" className="text-sm font-light text-white/40">Terms & Conditions</NavLink>
      </div>
    </footer>
  );
};


export default Footer