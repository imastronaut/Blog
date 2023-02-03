import React from 'react'

const Comment = ({comment}) => {
  return (
    <div>
        <hr></hr>
        <p><strong>{comment.user.username}<span> </span><small>{comment.user.email} <span> </span>{comment.createdAt}</small></strong></p>
        <p>{comment.body}</p>
    </div>
  )
}

export default Comment
