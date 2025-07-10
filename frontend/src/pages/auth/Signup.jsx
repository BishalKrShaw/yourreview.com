import React from 'react'

const Signup = () => {
  return (
    <div className='px-5 py-4'>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" id="" placeholder='Enter first name' className='border border-black'/>
        <input type="text" id="" placeholder='Enter last name' className='border border-black'/>
        <input type="text" id="" placeholder='Enter your business name' className='border border-black'/>
        <input type="email" id="" placeholder='Enter email id' className='border border-black'/>
        <input type="password" id="" placeholder='Enter password' className='border border-black'/>
        <button className='bg-black text-white rounded cursor-pointer px-5 py-2'>Sign up</button>
      </form>
    </div>
  )
}

export default Signup