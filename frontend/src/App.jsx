import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import UserHome from './pages/user/UserHome'
import BrowsePage from './pages/user/BrowsePage'
import HiddenRoute from './shared/HiddenRoute'
import ProtectedRoute from './shared/ProtectedRoute'
import CreateMovie from './pages/admin/CreateMovie'
import NavBar from './shared/Navbar'
import EditProfile from './pages/user/EditProfile'
import MovieDelete from './pages/admin/MovieDelete'

function Main() {
 
  return (
    <>
      <Routes>
        <Route element={<HiddenRoute isAvailable />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<HiddenRoute />}>
          <Route path="/userhome" element={<UserHome />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/edit-profile" element={<EditProfile />} />

          <Route path="/admin-panel" element={<ProtectedRoute><CreateMovie /></ProtectedRoute>} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <NavBar />
      <Main />
      <Toaster position="top-center" reverseOrder={false} />
    </Router>
  );
}

export default App
