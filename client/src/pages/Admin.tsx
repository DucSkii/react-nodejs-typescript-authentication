import React, { useState, useEffect, useContext } from 'react'
import { myContext } from '../Context'
import axios from 'axios'

const Admin = () => {
  const [users, setUsers] = useState<any>([])
  const ctx = useContext(myContext)

  useEffect(() => {
    axios.get("http://localhost:4000/getallusers", {
      withCredentials: true,
    }).then((res) => {
      setUsers(res.data.filter((user: any) => {
        return user.username !== ctx.username
      }
      ))
    })
  }, [ctx])

  const deleteUser = (e: any) => {
    if (e.getAttribute('data-admin') === 'true') {
      return console.log("User is an admin")
    }
    axios.post('http://localhost:4000/deleteuser', {
      id: e.id
    }, {
      withCredentials: true,
    }).then(res => {
      console.log(res.data)
    })
  }

  const renderUsers = () => {
    return users.map((user: any, id: any) => {
      return (
        <div style={{ display: 'flex' }} key={id}>
          <div style={{ marginRight: '20px' }}>Username: {user.username}</div>
          <div style={{ marginRight: '20px' }}>Admin: {String(user.isAdmin)}</div>
          <button id={user.id} data-admin={user.isAdmin} onClick={e => deleteUser(e.target)}>Delete User</button>
        </div>
      )
    })
  }

  if (!users) {
    return null
  }

  return (
    <div style={{ width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ margin: '3vh 0' }}>Admin</h1>
      {users.length ? (
        <>
          {renderUsers()}
        </>
      ) : (
          <div>
            <h2>No users found</h2>
          </div>
        )}
    </div>
  )
}

export default Admin