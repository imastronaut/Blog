import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import PostsList from '../components/PostsList'
const Home = () => {

  const {user,posts} =useContext(AuthContext)

  
  return (
    <>
    <header>Hello {user.username}</header>
    {posts && <PostsList/>}
    {!posts && <p>No posts yet!! Post Something</p>}
    </>
  )
}

export default Home