import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import { AiOutlineComment } from "react-icons/ai";
import api from '../api/Post'

const Post = ({post}) => {
  const {user, authTokens} = useContext(AuthContext)
  let [comments, setComments]= useState([])
  const getComments = async(id)=>{
    try{
      let response = await api.get(`/post/${id}`,{
        headers:{
          "Content-type":"application/json",
          "Authorization":"Bearer "+String(authTokens.access)
        }
      })
      let data = await response.data
      setComments(data)
      
    }catch(err){
      console.log(err)
    }
  }
   
  useEffect(()=>{
    getComments(post.id)
  },[])
  return (
    <div>
    <article>
      <Link to={`/user/${post.user.id}`}className='link'><strong>{post.user.username}</strong><span> </span><small>@{post.user.email}</small><span>   </span>{post.createdAt}</Link>
      <Link to={`/post/${post.id}`} className='link'>
        <p>{post.description}</p>
        <td>
        <small>
          <tr style={{}}>
            <AiOutlineComment/>{comments.length}
            <input type="checkbox" id="like" onChange={()=>console.log("changed")}checked={post.likes.filter((like)=>like.id===user.id).length?true:false}/>{post.likes.length}
          </tr>
        </small>
        </td>
      </Link>
      <hr></hr>
    </article>
    </div>
  )
}

export default Post