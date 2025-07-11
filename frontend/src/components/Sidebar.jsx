import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className='flex flex-col gap-4'>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/campaigns">Campaigns</NavLink>
      <NavLink to="/create-campaign">Create Campaign</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/logout">Logout</NavLink>
    </aside>
  )
}

export default Sidebar