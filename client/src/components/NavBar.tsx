import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Link to='/' style={{ padding: '15px', backgroundColor: 'rgba(230, 55, 55, 0.5)' }}>
        <h2>HOME</h2>
      </Link>
      <Link to='/admin' style={{ padding: '15px', backgroundColor: 'rgba(58, 55, 230, 0.5)' }}>
        <h2>ADMIN</h2>
      </Link>
      <Link to='/profile' style={{ padding: '15px', backgroundColor: 'rgba(55, 230, 72, 0.5)' }}>
        <h2>PROFILE</h2>
      </Link>
      <Link to='/login' style={{ padding: '15px', backgroundColor: 'rgba(206, 230, 55, 0.5)' }}>
        <h2>LOGIN</h2>
      </Link>
    </div>
  )
}

export default NavBar