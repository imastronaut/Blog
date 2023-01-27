import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'


const Header = () => {
    let {user, logoutUser} = useContext(AuthContext)
    const {search,setSearch} = useContext(AuthContext)

  return (
    <header className='header'>

        <ul>
          <li><Link to='/' className='link'>Home</Link></li>
        {user? <>
          <li><Link to='/post/' className='link'>Post</Link></li>
          <li><Link onClick={logoutUser} className='link'>logout</Link></li>
        </>
        : 
          <li><Link to='/login' className='link'>Login</Link></li>
        }
        <li>
        <form className='form'>
          <input type="text" placeholder='Search' value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </form>
        </li>
        <li>{user?<p>Hello {user.username}</p>:<p>you are not loggedin! Please Login...</p>}</li>
        </ul>
    </header>
  )
}

export default Header