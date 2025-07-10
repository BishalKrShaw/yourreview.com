import React from 'react'

const Login = () => {
  return (
    <div className='px-5 py-4'>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="email" id="" placeholder='Enter email id' className='border border-black'/>
        <input type="password" id="" placeholder='Enter password' className='border border-black'/>
        <button className='bg-black text-white rounded cursor-pointer px-5 py-2'>Login</button>
      </form>
    </div>
  )
}

export default Login