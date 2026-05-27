import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/general/Home'
import Save from '../pages/general/Save'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import CreateFood from '../pages/food-partner/CreateFood'
import Profile from '../pages/food-partner/Profile'

// Route placeholder for partner's food feed. Replace with actual page when ready.

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/user/login" replace />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/saved" element={<Save/>} />
        <Route path="/user/register" element={<UserRegister/>} />
        <Route path="/user/login" element={<UserLogin/>} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister/>} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin/>} />
        <Route path="/partner/:partnerId" element={<div>Partner Foods (placeholder)</div>} />
        <Route path="/food-partner/:id" element={<Profile/>} />
        <Route path="/create-food" element={<CreateFood/>} />
      </Routes>
    </Router>
  )
}

export default AppRoutes