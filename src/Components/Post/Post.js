import React from 'react';
import './Post.css';
import { Avatar } from '@material-ui/core';
function Post({ username, caption, imageUrl }) {
  console.log('USERNAME', username);
  console.log('IMAGE', imageUrl);
  console.log('CAPTION', caption);
  return (
    <div className='post'>
      <div className='post__header'>
        <Avatar className='post__avatar' alt={username} />
        <h3>{username}</h3>
      </div>

      <img className='post__image' src={imageUrl} alt='react logo' />

      <h4 className='post__text'>
        <strong>{username}: </strong>
        {caption}
      </h4>
    </div>
  );
}

export default Post;
