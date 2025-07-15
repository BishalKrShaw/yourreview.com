import React, { useState } from "react";
import Button from "./Button";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <nav className="px-5 py-4 flex justify-between items-center fixed top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl rounded-full text-white bg-white/10 backdrop-blur-md shadow-[0_4px_20px_rgba(255,255,255,0.05)] z-[100] border border-white/10">
        {/* Logo */}
        <div className="text-xl font-semibold">
          <NavLink to="/">YourReview</NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10">
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/aboutus">About us</NavLink>
          <NavLink to="/contactus">Contact us</NavLink>
        </div>

        {/* Login Button - Hidden on small screens */}
        <div className="hidden md:block">
          <Button btnText={"Login"} onClickFn={() => navigate("/login")} />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur-sm z-[90] flex flex-col items-center justify-center gap-6 md:hidden text-white text-xl">
          <NavLink to="/services" onClick={toggleMenu}>Services</NavLink>
          <NavLink to="/pricing" onClick={toggleMenu}>Pricing</NavLink>
          <NavLink to="/aboutus" onClick={toggleMenu}>About us</NavLink>
          <NavLink to="/contactus" onClick={toggleMenu}>Contact us</NavLink>
          <Button btnText={"Login"} onClickFn={() => { toggleMenu(); navigate("/login"); }} />
        </div>
      )}
    </>
  );
};

export default Navbar;
