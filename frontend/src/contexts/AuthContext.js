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
    let [search,setSearch] = useState('')
    let [searchResults, setSearchResults] = useState([])
    let [loginmessage, setLoginmessage] = useState('')
    

    const navigate = useNavigate()



    const loginUser = async(e) =>{
        e.preventDefault();
        let response = await api.post('/token/',{
            "email":e.target.email.value,
            "password":e.target.password.value
        })
        .catch(err=>console.log(err))
        if(response && response.status === 200){
            setAuthTokens(response.data)
            setUser(jwt_decode(response.data.access))
            localStorage.setItem('authTokens',JSON.stringify(response.data))
            navigate('/')
        }else{
            setLoginmessage('Invalid credentails')
        }
    }
    
    const logoutUser = ()=>{
        navigate('/login');
        console.log("logout called")
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        
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

    useEffect(()=>{
        fetchPosts()
    },[])

    useEffect(()=>{
        const filteredResults = posts.filter(post=>
            ((post.body).toLowerCase()).includes(search.toLowerCase()))
        setSearchResults(filteredResults)
    },[posts,search])
  



    let contextData={
        authTokens : authTokens,
        user : user,
        loginUser:loginUser,
        loginmessage:loginmessage,
        logoutUser:logoutUser,
        posts:posts,
        setPosts:setPosts,
        search:search,
        setSearch:setSearch,
        searchResults:searchResults,
        setSearchResults:setSearchResults,
        fetchPosts:fetchPosts
        
    }


    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}