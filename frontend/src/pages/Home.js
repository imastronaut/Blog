import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../contexts/AuthContext'
import api from '../api/Post'
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