import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import UserHome from './pages/UserHome'

function Main() {
 
  return (
    <>
      <Routes>
        
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          
          <Route path="/userhome" element={<UserHome />} />
       
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Main />
      <Toaster position="top-center" reverseOrder={false} />
    </Router>
  );
}

export default App
