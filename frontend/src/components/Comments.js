import React from 'react'

const Comments = ({comments}) => {
  return (
    <>{comments.map((comment)=>(
        <li key={comment.id}>{comment.description} - a comment by {comment.user.username} at {comment.createdAt}</li>
    ))}</>
  )
}

export default Comments