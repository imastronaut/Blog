import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import api from '../api/Post'
import { style } from '@mui/system';
import PostFooter from './PostFooter';

const Post = ({post}) => {
  const {user, authTokens} = useContext(AuthContext)
  const [like, setLike] = useState(post.likes.filter((like)=>like.id===user.id).length? "red":"none")
  return (
    <div>
    <article>
      <Link to={`/user/${post.user.id}`}className='link'><strong>{post.user.username}</strong><span> </span><small>@{post.user.email}</small><span>   </span>{post.createdAt}</Link>
      <Link to={`/post/${post.id}`} className='link'>
        <p>{post.body}</p>
      </Link>
      <PostFooter post={post}/>
      <hr></hr>
    </article>
    </div>
  )
}

export default Post