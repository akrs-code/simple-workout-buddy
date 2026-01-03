import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const handleClick = () => {
    logout()
  }
  return (
    <header className='heading'>
      <div className='nav'>
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
       </div>
        <nav>
          {user && (
          <div className='links'>
            <span>{user.email}</span>
            <button onClick={handleClick}>Logout</button>
          </div>
          )}
          {!user && (
          <div className='links'>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </div>
          )}
        </nav>
    </header>
  )
}

export default Navbar