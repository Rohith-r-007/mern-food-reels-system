import React from 'react'
import { Link } from 'react-router-dom'

const AuthSwitch = ({active='user'}) => {
  return (
    <div className="auth-switch" role="navigation" aria-label="Auth switch">
      <span>Switch:</span>
      <Link to="/user/register" className={active==='user' ? 'switch-active' : 'switch-link'}>User</Link>
      <span>·</span>
      <Link to="/food-partner/register" className={active==='partner' ? 'switch-active' : 'switch-link'}>Food partner</Link>
    </div>
  )
}

export default AuthSwitch
