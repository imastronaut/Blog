import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import api from '../api/Post'

const PostPage = () => {
    const {id} = useParams()

    const {posts,setPosts,authTokens} = useContext(AuthContext)
    const navigate = useNavigate()
    const post = posts.find((post)=>(post.id).toString()===id)

    const handleDelete = async(id)=>{
      try{
        let response = await api.delete(`/post/${id}`,{
          headers:{
            "Content-type":"application/json",
            "Authorization":"Bearer "+String(authTokens.access)
          }
        })
        const postlist = posts.filter(post=>post.id!==id)
        setPosts(postlist)
        navigate('/');
        
      }catch(err){
        console.log(`Error:${err.message}`)
      }
    }

  return (
    <>
    {post && 
    <>
    <p>{post.description} {post.createdAt}</p>
    <button onClick={()=>handleDelete(post.id)}>Delete</button>
    </>}
    {!post &&
            <>
            <h2>Page Not Found</h2>
            <p>Well, that's disappointing</p>
            <p>
              <Link to="/">Visit out home page</Link>
            </p>
            </>
          }
    </>
  )
}

export default PostPage