import React from "react";
import Button from "./Button";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="px-5 py-4 flex justify-between items-center border border-white/10 fixed top-5 left-1/2 -translate-x-1/2 min-w-[1000px] rounded-full text-white bg-white/10 backdrop-blur-md shadow-[0_4px_20px_rgba(255,255,255,0.05)] z-50">
      <div className="text-xl font-semibold">
        <NavLink to="/">YourReview</NavLink>
      </div>
      <div className="flex gap-10">
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/pricing">Pricing</NavLink>
        <NavLink to="/aboutus">About us</NavLink>
        <NavLink to="/contactus">Contact us</NavLink>
      </div>
      <div>
        <Button btnText={"Login"} onClickFn={() => navigate("/login")} />
      </div>
    </nav>
  );
};

export default Navbar;
