import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import api from '../api/Post'
import Comments from './Comments'



const PostPage = () => {
    const {id} = useParams()

    const {posts,setPosts,authTokens, user} = useContext(AuthContext)
    const navigate = useNavigate()
    const post = posts.find((post)=>(post.id).toString()===id)

 
    
    let [comments, setComments]= useState([])
    let [loading,setLoading] = useState(true)
    let [comment, setComment] = useState('')

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
      if(loading){
        setLoading(false)
      }
    }
     
    useEffect(()=>{
      getComments(id)
    },[])

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
        console.log("calling get comment")
        getComments(id)
        
      }catch(err){
        console.log(err)
      }
    }

    
    
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
    <p>{post.description} {post.createdAt} Likes:{post.likes.length}</p>
    <input id="heart" type="checkbox" />
    <label for="heart">Like</label>

    {post.likes &&
    <>
    <p>Liked by</p>
    <ul>{post.likes.map((user,index)=>(
      <li key={index}><Link to={`/user/${user.id}`}>{user.username}</Link></li>
    ))}
    </ul>
    </>}

    {user.id===post.user?<button onClick={()=>handleDelete(post.id)}>Delete</button>:null}
    </>}
    {comments && 
    <>
      <p>Comments</p>
      <p><Comments comments={comments}/></p>
    </>
    }
    {post && 
    <>
    <form onSubmit={handleComment}>
      <label htmlFor="comment">Add your Comment</label>
      <input type="text" placeholder='Type your comment' id="comment" name="comment" required value={comment} onChange={(e)=>setComment(e.target.value)}/>
      <button type="submit">Add Comment</button>
    </form>
    </>}
    {!post && !loading &&
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