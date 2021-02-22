import React from 'react'
import { Link } from 'react-router-dom'

const Logout = () => {
  return (
    <div style={{ width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ margin: '3vh 0' }}>Successfully Logged out</h1>
      <Link to='/'><h2 style={{border: '1px solid black'}}>Redirect to Home</h2></Link>
    </div>
  )
}

export default Logout