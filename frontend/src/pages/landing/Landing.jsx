import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar';

const Landing = () => {

  const navigate = useNavigate();

  return (
    <div>
      <Navbar/>
      <div className='px-5 py-4 h-[80vh] flex justify-center items-center text-center font-normal flex-col leading-tight w-[1000px] mx-auto'>
        <div className='text-[3rem]'>Collect reviews form your customers &</div>
        <div className='text-[3rem]'>display in your website easily.</div>
        <button className='text-2xl bg-black text-white rounded px-10 py-2 cursor-pointer mt-[2rem]' onClick={() => navigate("/signup")}>Get started</button>
      </div>
    </div>
  )
}

export default Landing