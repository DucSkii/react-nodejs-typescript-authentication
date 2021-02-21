import React from 'react'
import { Switch, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Admin from './pages/Admin'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import './app.css'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/admin' component={Admin} />
        <Route path='/login' component={Login} />
        <Route path='/profile' component={Profile} />
      </Switch>
    </div>
  )
}

export default App
