import React from 'react'
import CommentIcon from '@mui/icons-material/Comment';
const CommentButton = ({post}) => {
    
  return (
    <div>
      <CommentIcon />{post.comments.length}
    </div>
  )
}

export default CommentButton
