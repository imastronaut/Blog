import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import Nav from './Nav'

const Header = () => {
    let {user, logoutUser} = useContext(AuthContext)  
  return (
    <header>
        <Link to='/'>Home</Link>
        {user? <ul style={{margin:0,padding:0}}>
          <li><p onClick={logoutUser}>logout</p></li>
          <li><Link to='/post/'>Post</Link></li>
          <Nav/>
         </ul>
        : <Link to='/login'>Login</Link>}
    </header>
  )
}

export default Header