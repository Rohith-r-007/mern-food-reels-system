import React from 'react'
import AuthSwitch from '../../components/AuthSwitch'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserRegister = () => {

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post("http://localhost:3000/api/auth/user/register", {
        fullName: firstName + " " + lastName,
        email,
        password
    },{
      withCredentials: true
    })

    console.log(response.data);

    navigate("/")
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Create account</h2>
        <p className="auth-sub">Sign up to explore delicious reels</p>

        <AuthSwitch active="user" />

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="col">
              <label>First name</label>
              <input name="firstName" type="text" placeholder="First name" />
            </div>
            <div className="col">
              <label>Last name</label>
              <input name="lastName" type="text" placeholder="Last name" />
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" placeholder="Choose a password" />
          </div>
          <div className="auth-actions">
            <button className="btn" type="submit">Create account</button>
          </div>
          <p className="auth-alt">Already have an account? <Link to="/user/login">Sign in</Link></p>
        </form>
      </div>
    </div>
  )
}

export default UserRegister
