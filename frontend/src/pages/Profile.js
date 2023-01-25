import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/Post'

const Profile = () => {
    const {id} = useParams()
    let [profile, setProfile] = useState(null)
    const getUser =  async(id)=>{
        let response = await api.get(`/user/${id}`)
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
    </>}
    {!profile && <p>Loading</p>}
    </>
  )
}

export default Profile