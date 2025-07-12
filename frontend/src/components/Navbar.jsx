import React from "react";
import Button from "./Button";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="px-5 py-4 flex justify-between items-center border border-white/10 absolute mt-5 min-w-[1000px] rounded-full left-1/2 -translate-x-1/2 text-white bg-white/10 backdrop-blur-md shadow-[0_4px_20px_rgba(255,255,255,0.05)]">
      <div className="text-xl font-semibold">YourReview</div>
      <div className="flex gap-10">
        <NavLink to="/pricing">Services</NavLink>
        <NavLink to="/pricing">Pricing</NavLink>
        <NavLink to="/pricing">About us</NavLink>
        <NavLink to="/pricing">Contact us</NavLink>
      </div>
      <div>
        <Button btnText={"Login"} onClickFn={() => navigate("/login")} />
      </div>
    </nav>
  );
};

export default Navbar;
