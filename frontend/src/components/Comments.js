import React from 'react'

const Comments = ({comments}) => {
  return (
    <>{comments.map((comment)=>(
        <li key={comment.id}>{comment.description} - a comment by {comment.user} at {comment.createdAt}</li>
    ))}</>
  )
}

export default Comments