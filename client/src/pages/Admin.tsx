import React, { useState, useEffect, useContext } from 'react'
import { myContext } from '../Context'
import axios, { AxiosResponse } from 'axios'
import { UserInterface } from '../interfaces/interfaces'

const Admin = () => {
  const ctx = useContext(myContext)
  const [users, setUsers] = useState<UserInterface[]>()

  useEffect(() => {
    axios.get("http://localhost:4000/getallusers", {
      withCredentials: true,
    }).then((res: AxiosResponse) => {
      setUsers(res.data.filter((user: UserInterface) => {
        return user.username !== ctx.username
      }
      ))
    })
  }, [ctx])

  const deleteUser = (e: any) => {
    let userId: string;
    userId = e.id
    if (e.getAttribute('data-admin') === 'true') {
      return console.log("User is an admin")
    }
    axios.post('http://localhost:4000/deleteuser', {
      id: userId
    }, {
      withCredentials: true,
    }).then((res: AxiosResponse) => {
      console.log(res.data)
    })
  }


  if (!users) {
    return null
  }

  const renderUsers = () => {
    return users.map((user: UserInterface, id: number) => {
      return (
        <div style={{ display: 'flex' }} key={id}>
          <div style={{ marginRight: '20px' }}>Username: {user.username}</div>
          <div style={{ marginRight: '20px' }}>Admin: {String(user.isAdmin)}</div>
          <button id={user.id} data-admin={user.isAdmin} onClick={e => deleteUser(e.target)}>Delete User</button>
        </div>
      )
    })
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