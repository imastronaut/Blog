import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({post}) => {
  return (
    <div>
    <p><Link to={`/post/${post.id}`}>Post : {post.id}</Link></p>
    <p>{post.description} {post.createdAt} </p>
    </div>
  )
}

export default Post