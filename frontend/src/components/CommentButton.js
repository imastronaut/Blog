import React from 'react'
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from 'react-router-dom';
const CommentButton = ({post}) => {
    
  return (
    <div>
      <Link to={`/post/${post.id}/comment`} ><CommentIcon /></Link>{post.comments.length}
    </div>
  )
}

export default CommentButton
