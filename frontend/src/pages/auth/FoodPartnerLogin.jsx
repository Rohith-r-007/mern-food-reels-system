import React from 'react'
import AuthSwitch from '../../components/AuthSwitch'
import { Link } from 'react-router-dom'

const FoodPartnerLogin = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: implement partner login logic
    // const data = new FormData(e.target)
    // const payload = Object.fromEntries(data.entries())
    // console.log(payload)
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Partner sign in</h2>
        <p className="auth-sub">Sign in to manage your reels</p>

        <AuthSwitch active="partner" />

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Contact email</label>
            <input name="email" type="email" placeholder="contact@restaurant.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" placeholder="Your password" />
          </div>
          <div className="auth-actions">
            <button className="btn" type="submit">Sign in</button>
          </div>
          <p className="auth-alt">Need an account? <Link to="/food-partner/register">Create one</Link></p>
        </form>
      </div>
    </div>
  )
}

export default FoodPartnerLogin
