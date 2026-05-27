import React from 'react'
import AuthSwitch from '../../components/AuthSwitch'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {

  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post("http://localhost:3000/api/auth/user/login", {
      email,
      password
    }, {
      withCredentials: true
    })

    console.log(response.data);

    navigate("/home");
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-sub">Sign in to continue</p>

        <AuthSwitch active="user" />

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" placeholder="Your password" />
          </div>
          <div className="auth-actions">
            <button className="btn" type="submit">Sign in</button>
          </div>
          <p className="auth-alt">New here? <Link to="/user/register">Create an account</Link></p>
        </form>
      </div>
    </div>
  )
}

export default UserLogin
