import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

const Login = () => {

    const {loginUser,loginmessage} = useContext(AuthContext)


  return (
    <>
        {loginmessage && <p>Invalid credentails</p>}
        <form className='form-login' onSubmit={loginUser}>
        <input type="email" placeholder='Enter Email'required name="email"/>
        <input type="password" placeholder='Enter Password' required name='password'/>
        <button type="submit">Login</button>
        </form>
        <p>Don't have an account? Register <Link to='/register'>here</Link></p>
    </>
  )
}

export default Login

