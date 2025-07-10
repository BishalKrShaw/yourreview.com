import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout.jsx'
import Landing from './pages/landing/Landing.jsx'
import Login from './pages/auth/Login.jsx'
import Signup from './pages/auth/Signup.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<App/>}>

      {/* Public Routes */}
      <Route element={<PublicLayout/>}>
        <Route index element={<Landing/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute><DashboardLayout/></ProtectedRoute>}>
        <Route path='dashboard' element={<Dashboard/>}/>
      </Route>

    </Route>

  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
