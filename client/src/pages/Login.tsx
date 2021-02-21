import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const login = (e: any) => {
    e.preventDefault()
    axios.post('http://localhost:4000/login', {
      username,
      password,
    }, {
      withCredentials: true,
    }).then((res) => {
      console.log(res.data)
      setUsername('')
      setPassword('')
    })
  }

  const getUser = () => {
    axios.get('http://localhost:4000/user', {
      withCredentials: true,
    }).then((res) => {
      if (!res.data) {
        return console.log('No user')
      }
      console.log(res.data)
    }
    )
  }

  return (
    <div style={{ width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ margin: '3vh 0px' }}>Login</h1>
      <form onSubmit={login}>
        <input placeholder='Username' required value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder='Password' required value={password} onChange={e => setPassword(e.target.value)} />
        <button type='submit'>Login</button>
      </form>
      <button onClick={getUser} style={{ marginTop: '3vh' }}>Get User</button>
    </div>
  )
}

export default Login