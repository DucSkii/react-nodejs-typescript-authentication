import React, { useState } from 'react'
import axios from 'axios'

const Register = () => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const register = (e: any) => {
    e.preventDefault()
    axios.post('http://localhost:4000/register', {
      username,
      password,
    }, {
      withCredentials: true,
    }).then((res) => {
      console.log(res.data)
      setUsername('')
      setPassword('')
      alert("Successfully signed up")
    })
  }

  return (
    <div style={{ width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ margin: '3vh 0' }}>Register</h1>
      <form onSubmit={register}>
        <input placeholder='Username' required value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder='Password' required value={password} onChange={e => setPassword(e.target.value)} />
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register