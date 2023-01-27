import React, { useContext } from 'react'
import api from '../api/Post'
import AuthContext from '../contexts/AuthContext'

const AddComment = ({comment,setComment,id, getComments}) => {

    const {authTokens} = useContext(AuthContext)

    


    const handleComment = async(e)=>{
        e.preventDefault();
        try{
          
          let response = await api.post(`/comment/${id}`,{
            "comment": e.target.comment.value
          },{
            headers:{
              "Content-type":"application/json",
              "Authorization":"Bearer "+String(authTokens.access)
            }
          })
          let data = await response.data
          setComment('')
          getComments(id)
          
          
        }catch(err){
          console.log(err)
        }
      }
  return (
    <div>AddComment
        <form onSubmit={handleComment}>
      <label htmlFor="comment">Add your Comment</label>
      <input type="text" placeholder='Type your comment' id="comment" name="comment" required value={comment} onChange={(e)=>setComment(e.target.value)}/>
      <button type="submit">Add Comment</button>
    </form>
    </div>
  )
}

export default AddComment