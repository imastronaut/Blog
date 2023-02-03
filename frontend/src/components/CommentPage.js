import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import api from '../api/Post'
import Comment from './Comment'

const CommentPage = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const {posts, authTokens} = useContext(AuthContext)
    const post = posts.find((post)=>(post.id).toString() === id.toString())
    let [load, setLoad] = useState(0)
    let [comment, setComment] = useState('')
    let [comments, setComments] = useState([])
    
    const getComments = async()=>{
        let response = await api.get(`/comment/${id}`,{
            headers:{
                "Content-type":"application/json",
                "Authorization":"Bearer "+String(authTokens.access)
            }
        })
        let data = await response.data 
        setComments(data)
    }

    useEffect(()=>{
        getComments()
    },[load])


    const handleSubmit= async(e)=>{
        e.preventDefault()
        let response = await api.post(`/comment/${id}`,{
            "comment":e.target.comment.value
        },{
            headers:{
                "Content-type":"application/json",
                "Authorization":"Bearer "+String(authTokens.access)
            }
        })
        setLoad(load+1)
        const newComments = [...comments, response.data]
        post.comments = newComments
        setComment('')
    
    }





  return (
    <div>
        {post && <>
        <Link className="link" name='comment' to={`/user/${post.user.id}`}><p><strong>{post.user.username}</strong>    <span><small>@{post.user.email}</small></span></p></Link>
        <p>{post.body}</p>
        <p>Add Your Comment</p>
        <form onSubmit={handleSubmit}>
            <input type="text" name="comment" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder='Type your comment'/>
            <input type="submit" value="Reply"/>
        </form>
        {comments && 
        <>
        {comments.map((comment)=>(
            <Comment key={comment.id} comment={comment}/>
        ))}
        </>}
        </>
        }
    </div>
  )
}

export default CommentPage
