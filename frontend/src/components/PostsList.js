import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import Post from './Post'

const PostsList = () => {

    const {posts} = useContext(AuthContext)

    
  return (
    <div className='postslist'>
        <p>Posts</p>
        {posts.map((post)=>
        <Post key ={post.id} post={post}/>)}
    </div>
  )
}

export default PostsList