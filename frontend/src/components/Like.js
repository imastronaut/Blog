import React, { useContext, useState } from 'react'
import AuthContext from '../contexts/AuthContext'
import api from '../api/Post'

const Like = ({post}) => {
    const {user,authTokens} = useContext(AuthContext)
    const [check, setCheck] = useState(false)

    const handleLike = async(e)=>{
      
        if(e.target.checked){
          let response = await api.post(`/like/${post.id}`,{"email":"ok"},{
            headers:{
              "Content-type":"application/json",
              "Authorization":"Bearer "+String(authTokens?.access)
            }
            
          })
          let data = await response.data
          console.log(data)
          setCheck(true)


        }else{
          let response = await api.delete(`/like/${post.id}`,{
            headers:{
              "Content-type":"application/json",
              "Authorization":"Bearer "+String(authTokens.access)
            }
          })
          let data = await response.data
          console.log(data)
          setCheck(false)
        }
    }
  return (
    <div>
        <p>No of likes : {post.likes.length}</p>
        <input type="checkbox" id="like" onChange={handleLike} checked={check || post.likes.filter((like)=>like.id===user.id).length?true:false}/>
        <label htmlFor="like">Like This Post</label>
    </div>
  )
}

export default Like