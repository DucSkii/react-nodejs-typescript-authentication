import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { myContext } from '../Context'
import axios from 'axios'

const NavBar = () => {
  const User = useContext(myContext)

  const logout = () => {
    axios.get("http://localhost:4000/logout", {
      withCredentials: true,
    }).then(res => {
      if (res.data === 'Logged Out') {
        window.location.href = '/logout'
      }
    })
  }

  return (
    <div style={{ display: 'flex', width: '100vw', justifyContent: 'space-evenly' }}>
      <Link to='/'
        style={{
          padding: '15px',
          backgroundColor: 'rgba(230, 55, 55, 0.5)',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <h2>HOME</h2>
      </Link>
      {User ? (
        <>
          {User.isAdmin ? (
            <Link to='/admin'
              style={{
                padding: '15px',
                backgroundColor: 'rgba(58, 55, 230, 0.5)',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <h2>ADMIN</h2>
            </Link>
          ) : null}
          <Link to='/profile'
            style={{
              padding: '15px',
              backgroundColor: 'rgba(55, 230, 72, 0.5)',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <h2>PROFILE</h2>
          </Link>
          <Link to='/logout' onClick={logout}
            style={{
              padding: '15px',
              backgroundColor: 'rgba(206, 230, 55, 0.5)',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <h2>LOGOUT</h2>
          </Link>
        </>
      ) : (
          <>
            <Link to='/login'
              style={{
                padding: '15px',
                backgroundColor: 'rgba(206, 230, 55, 0.5)',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <h2>LOGIN</h2>
            </Link>
            <Link to='/register'
              style={{
                padding: '15px',
                backgroundColor: 'rgba(206, 230, 55, 0.5)',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <h2>REGISTER</h2>
            </Link>
          </>
        )}
    </div>
  )
}

export default NavBar