import React, { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase';
import Post from './Components/Post/Post';
function App() {
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => doc.data()));
    });
  }, []);
  const [posts, setPosts] = useState([]);
  return (
    <div className='app'>
      <div className='app__header'>
        <img
          className='app__headerImage'
          src='https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png'
          alt='instagram logo'
        />
      </div>

      {posts.map((post, i) => (
        <Post
          key={i}
          imageUrl={post.imageUrl}
          caption={post.caption}
          username={post.username}
        />
      ))}
    </div>
  );
}

export default App;
