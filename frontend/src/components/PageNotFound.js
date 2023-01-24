import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div>
        <p>Hmm.. Page not found</p>
        <Link to="/">Visit our home page</Link>
    </div>
  )
}

export default PageNotFound