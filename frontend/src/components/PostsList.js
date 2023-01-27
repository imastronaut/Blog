import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import Post from './Post'

const PostsList = () => {

    const {searchResults} = useContext(AuthContext)
    


    
  return (
    <div className='postslist'>
       {searchResults?searchResults.map(post=><Post key ={post.id} post={post}/>):<p>No posts yet</p>}
    </div>
  )
}

export default PostsList