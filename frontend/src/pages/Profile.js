import React, { useContext, useEffect, useState } from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import api from '../api/Post'
import AuthContext from '../contexts/AuthContext'

const Profile = () => {

    const {id} = useParams()
    const {posts, user} = useContext(AuthContext)
    const userPosts = posts.filter((post)=>(post.user.id).toString()===(user.id).toString())
    let [profile, setProfile] = useState(null)




    const getUser =  async(id)=>{
        let response = await api.get(`/user/${id}/`)
        setProfile(response.data)
    }
    useEffect(()=>{
        getUser(id)
    },[])
  return (
    <>
    {profile && <>
        <p>Username : {profile.username}</p>
        <p>Email : {profile.email}</p>
        <div>
        </div>
    </>}
    {!profile && <p>Loading</p>}
    </>
  )
}

export default Profile