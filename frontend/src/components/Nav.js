import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'

const Nav = () => {
    const {search,setSearch} = useContext(AuthContext)
  return (
    <>
    <form>
        <input type="text" placeholder='Search' value={search} onChange={(e)=>setSearch(e.target.value)}/>
    </form>
    </>
  )
}

export default Nav

