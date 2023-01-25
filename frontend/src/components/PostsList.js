import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import Post from './Post'

const PostsList = () => {

    const {searchResults} = useContext(AuthContext)
    


    
  return (
    <div className='postslist'>
        <p>Posts</p>
        {searchResults.map((post)=>
        <Post key ={post.id} post={post}/>)}
    </div>
  )
}

export default PostsList