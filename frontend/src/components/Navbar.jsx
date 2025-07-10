import React from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <nav className='px-5 py-4 flex justify-between items-center shadow'>
      <div className='text-xl font-semibold'>Your Review</div>
      <div>
        <Button btnText={"Login"} onClickFn={() => navigate("/login")} />
      </div>
    </nav>
  )
}

export default Navbar