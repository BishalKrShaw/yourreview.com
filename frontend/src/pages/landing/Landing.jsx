import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-black">
        <Navbar />
        <div className="px-5 py-4 h-screen flex justify-center items-center text-center font-normal flex-col leading-tight w-[1000px] mx-auto text-white">
          <div className="text-[3rem]">
            Collect reviews from your customers &
          </div>
          <div className="text-[3rem]">display in your website easily.</div>
          <button
            className="px-6 py-2 rounded-full bg-white hover:bg-white/90 text-black border border-white/10 shadow-[0_4px_20px_rgba(255,255,255,0.1)] transition duration-200 cursor-pointer mt-10 text-[1.3rem] backdrop-blur-sm"
            onClick={() => navigate("/signup")}
          >
            Get started
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Landing;
