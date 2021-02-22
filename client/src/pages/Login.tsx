import React, { useState } from 'react'
import axios, { AxiosResponse } from 'axios'

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
    }).then((res: AxiosResponse) => {
      console.log(res.data)
      if (res.data === "success") {
        window.location.href = '/'
      }
    }, () => {
      console.log('Failed')
    })
  }

  return (
    <div style={{ width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ margin: '3vh 0px' }}>Login</h1>
      <form onSubmit={login}>
        <input placeholder='Username' required value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder='Password' required value={password} onChange={e => setPassword(e.target.value)} />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login