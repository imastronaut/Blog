import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

import PostFooter from './PostFooter';

const PostPage = () => {
    const {id} = useParams()
    const {posts} = useContext(AuthContext)
    const post = posts.find((post)=>(post.id).toString() === id)
    
  return (
    <div>
        {post && <>
            <h3><strong>{post.user.username}</strong><span> </span><small>@{post.user.email}</small><span> </span>{post.createdAt}</h3>
            <p>{post.body}</p>
            <PostFooter post={post}/> 
        </>}
    </div>
  )
}

export default PostPage

