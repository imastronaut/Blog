import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/Post'
const Register = () => {
    const navigate = useNavigate();
    let [message, setMessage] = useState(null)
    const handleRegister = async(e)=>{
        
        e.preventDefault()
        if(e.target.password.value!==e.target.confirmpassword.value){
            alert("Passwords not matching")
        }
        let response = await api.post('/register/',{
            "username":e.target.username.value,
            "email":e.target.email.value,
            "password":e.target.password.value
        })
        .catch((err)=>{
            let data = err.response.data;
            setMessage(data)
        })
        if(message){
            return
        }
        if(response.status === 200){
            alert("You are registered! now login")
            navigate('/')
        }
    }
  return (
    <>   
        {message && <p>{message}</p>}
        <form className='form-register' onSubmit={handleRegister}>
        <input type="text" placeholder='Username' name='username' required/>
        <input type="email" placeholder='Email' name='email' required/>
        <input type="password" placeholder='Password' name='password' required/>
        <input type="password" placeholder='Confirm Password' name='confirmpassword' required/>
        <button type="submit">Register</button>
        </form>
        <p>Have an account already? Login <Link to='/login'>here</Link></p>
    </>
  )
}

export default Register