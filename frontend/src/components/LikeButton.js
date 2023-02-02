import React, { useContext, useEffect, useState } from 'react'
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import AuthContext from '../contexts/AuthContext';
import api from '../api/Post'


const LikeButton = ({post}) => {

  const {user, authTokens} = useContext(AuthContext)
  let [color,setColor] = useState(post.likes.find((like)=>(like.id).toString()===user.id.toString())?"red":"black")

  const handleClick = async(e) =>{
    e.preventDefault()
    if(color==="red"){
      let response = await api.delete(`/like/${post.id}`,{
        headers:{
          "Content-type":"application/json",
          "Authorization":"Bearer " + String(authTokens.access)
        }
      })
      const newLikes = post.likes.filter((like)=>(like.id).toString()!==user.id.toString())
      post.likes = newLikes
      setColor("black")
    }else{
      let response = await api.post(`/like/${post.id}`,{"email":"email"},{
        headers:{
          "Content-type":"application/json",
          "Authorization":"Bearer "+String(authTokens.access)
        }
      })
      const newLikes = [...post.likes, response.data]
      post.likes = newLikes
      setColor("red")
    }
  }

  return (
    <div>
        <FavoriteTwoToneIcon id="like" type="checkbox" style={{color:`${color}`}} onClick={handleClick} />{post.likes.length}
        {post.likes.length && <>
        <p>Liked by</p>
        <ul>
          {post.likes.map((like)=>(
            <li key={like.id}>{like.username}</li>
          ))}
        </ul>
        </>}
    </div>
  )
}

export default LikeButton