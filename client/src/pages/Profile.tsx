import React, { useContext } from 'react'
import { myContext } from '../Context'

const Profile = () => {
  const user = useContext(myContext)
  
  return (
    <div style={{ width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{margin: '3vh 0'}}>Profile</h1>
      <h2>Username: {user.username}</h2>
    </div>
  )
}

export default Profile