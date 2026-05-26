import React from 'react'
import AuthSwitch from '../../components/AuthSwitch'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const FoodPartnerRegister = () => {

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    const response = await axios.post("http://localhost:3000/api/auth/food-partner/register", {
        name,
        contactName,
        phone,
        email,
        password,
        address
    }, {
      withCredentials: true
    })

    console.log(response.data);

    navigate("/create-food")
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Partner sign up</h2>
        <p className="auth-sub">Grow your business with our platform.</p>

        <AuthSwitch active="partner" />

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Business name</label>
            <input name="businessName" type="text" placeholder="Tasty Bites" />
          </div>

          <div className="form-row">
            <div className="col">
              <label>Contact name</label>
              <input name="contactName" type="text" placeholder="Jane Doe" />
            </div>
            <div className="col">
              <label>Phone</label>
              <input name="phone" type="text" placeholder="+1 555 123 4567" />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" placeholder="business@example.com" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" placeholder="Create password" />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input name="address" type="text" placeholder="123 Market Street" />
          </div>

          <p className="helper-text">Full address helps customers find you faster.</p>

          <div className="auth-actions">
            <button className="btn full" type="submit">Create Partner Account</button>
          </div>

          <p className="auth-alt">Already a partner? <Link to="/food-partner/login">Sign in</Link></p>
        </form>
      </div>
    </div>
  )
}

export default FoodPartnerRegister
