import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/Post'
import jwt_decode from "jwt-decode";


const AuthContext = createContext()
export default AuthContext;

export const AuthProvider = ({children}) =>{

    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens')?JSON.parse(localStorage.getItem('authTokens')):null)
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens')?jwt_decode(localStorage.getItem('authTokens')):null)
    let [loading, setLoading] = useState(true)
    let [posts, setPosts] = useState([])
    

    const navigate = useNavigate()



    const loginUser = async(e) =>{
        e.preventDefault();
        let response = await api.post('/token/',{
            "email":e.target.email.value,
            "password":e.target.password.value
        })
        .catch(err=>alert(err))
        let data = await response.data
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            navigate('/')
        }
    }
    
    const logoutUser = ()=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    const updateToken = async()=>{
        let response = await api.post('/token/refresh/',{
            'refresh': authTokens?.refresh
        })
        .catch(err=>logoutUser)
        let data = await response.data
        if(response.status===200){
            setAuthTokens(data)
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
        }
        if(loading){
            setLoading(false)
        }
        
    }



    

    useEffect(()=>{
        if(loading){
            updateToken()
        }
        let fourminutes = 1000*60*4
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        },fourminutes)
        return ()=>clearInterval(interval)
    },[authTokens,loading])

    useEffect(()=>{
        const fetchPosts = async()=>{
            try{
                let response = await api.get("");
                setPosts(response.data)
            }catch(err){
                if(err.response){
                    console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.header)
                }else{
                    console.log(`Error: ${err.message}`)
                }
                
            }
        }
        fetchPosts()
    },[])

    

  



    let contextData={
        authTokens : authTokens,
        user : user,
        loginUser:loginUser,
        logoutUser:logoutUser,
        posts:posts,
        setPosts:setPosts
        
    }


    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}