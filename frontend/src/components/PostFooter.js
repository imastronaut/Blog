import React from 'react'
import CommentButton from './CommentButton'
import LikeButton from './LikeButton'

const PostFooter = ({post}) => {
  return (
    <div style={{display:"flex" }}>
        <CommentButton post={post}/>
        <LikeButton post={post}/>
    </div>
  )
}

export default PostFooter
