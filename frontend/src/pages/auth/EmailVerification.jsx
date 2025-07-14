import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

const EmailVerification = () => {

  const [status, setStatus] = useState('Verifying...');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {

    const verifyEmail = async () => {
    const token = searchParams.get("token");
    if(!token) {
      setStatus("Invalid verification link.");
      return;
    }

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/verify-email?token=${token}`); 
      console.log(res.data);
      console.log(res.data.success);
      if(res.data.success) {
        setStatus("Email verified! Redirecting to login page...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setStatus("Verification failed!");
      }
    } catch (error) {
      setStatus("Invalid link");
    }
  }

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className='bg-black text-white h-screen flex justify-center items-center text-xl font-medium'>
      <p>{status}</p>
    </div>
  )
}

export default EmailVerification