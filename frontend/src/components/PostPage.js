import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import api from '../api/Post'
import Comments from './Comments'
import AddComment from './AddComment'
import Like from './Like'



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
    <Like post={post}/>
    {post.likes.length? 
    <>
    <p>Liked by</p>
    <ul>{post.likes.map((user,index)=>(
      <li key={index}><Link to={`/user/${user.id}`}>{user.username}</Link></li>
    ))}
    </ul>
    </>:null}

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
    <AddComment comment={comment} setComment={setComment} id={id} getComments={getComments}/>
    
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