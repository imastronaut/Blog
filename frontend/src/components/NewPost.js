import React, { useContext, useState } from 'react'
import AuthContext from '../contexts/AuthContext'
import api from '../api/Post'
import { useNavigate } from 'react-router-dom'

const NewPost = () => {
  const {posts, setPosts, authTokens} = useContext(AuthContext)
  const [postDescription, setPostDescription] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      let response = await api.post("post/",{
        "description": e.target.description.value
      },{
        headers:{
          "Content-type":"application/json",
          "Authorization":"Bearer "+String(authTokens.access)
        }
      })
      let newpost = await response.data
      const postslist = [...posts,newpost]
      setPosts(postslist)
      navigate("/")

    }catch(err){
      console.log(err)
    }
  }


  return (
    <main className='newpost'>
      <h2>New Post</h2>
      <form className='postform' onSubmit={handleSubmit}>
        <label htmlFor='description'>Descriptiom</label>
        <textarea id='description' required value={postDescription} onChange={(e)=>setPostDescription(e.target.value)}/>
        <button type='submit'>Post</button>
      </form>
    </main>
  )
}

export default NewPost