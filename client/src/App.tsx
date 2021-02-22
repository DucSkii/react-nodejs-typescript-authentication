import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Admin from './pages/Admin'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import './app.css'
import Register from './pages/Register'
import { myContext } from './Context'
import Logout from './pages/Logout'

function App() {
  const user = useContext(myContext)
  return (
    <div className="App">
      <NavBar />
      <Switch>
        {user ? (
          <>
            <Route path='/' exact component={Home} />
            <Route path='/profile' component={Profile} />
            {user.isAdmin ? <Route path='/admin' component={Admin} /> : null}
          </>
        ) : (
            <>
              <Route path='/' exact component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/logout' component={Logout} />
            </>
          )}
      </Switch>
    </div>
  )
}

export default App
