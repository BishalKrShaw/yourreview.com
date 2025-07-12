import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 px-8 py-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout