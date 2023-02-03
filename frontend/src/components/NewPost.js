import { TextareaAutosize } from '@mui/material'
import React, { useContext, useState } from 'react'
import AuthContext from '../contexts/AuthContext'
import api from '../api/Post'
import { useNavigate } from 'react-router-dom'

const NewPost = () => {
    const {user, posts, setPosts, authTokens, fetchPosts} = useContext(AuthContext)
    const navigate = useNavigate()
    let [body, setBody] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()
        let response = await api.post("/post/",{
            "body":e.target.body.value
        },{
            headers:{
                "Content-type":"application/json",
                "Authorization":"Bearer "+String(authTokens.access)
            }
        })
        fetchPosts()
        navigate("/")

    }



  return (
    <div>
      New Post
      <form onSubmit={handleSubmit}>
        <TextareaAutosize name="body" style={{width:"300px", margin:"10px"}} placeholder='Type your tweet' value={body} onChange={(e)=>setBody(e.target.value)}></TextareaAutosize>
        <input type="submit" value="Post"/>
      </form>
    </div>
  )
}

export default NewPost
