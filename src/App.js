import React, { useState, useEffect } from 'react';
import './App.css';
import { db, auth } from './firebase';
import Post from './Components/Post/Post';
import { Modal, Button, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ImageUpload from './Components/ImageUpload/ImageUpload';
const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);

  console.log('USER', user);
  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setPosts(
          snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // if user has logged in...
        setUser(authUser);
      } else {
        // if user has logged out...
        setUser(null);
      }
    });

    return () => {
      // perform some cleanup actions
      unsubscribe();
    };
  }, [user, username]);

  const signUp = event => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch(error => alert(error.message));
    setOpen(false);
  };

  const signIn = event => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => alert(error.message));

    setOpenSignIn(false);
  };
  console.log(posts);
  return (
    <div className='app'>
      {/*//Sign Up*/}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
            <center>
              <img
                className='app__headerImage'
                src='https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png'
                alt='instagram logo'
              />
            </center>
            <Input
              placeholder='username'
              type='text'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <Input
              placeholder='email'
              type='text'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={signUp}>
              Sign up
            </Button>
          </form>
        </div>
      </Modal>

      {/*//SignIn */}
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
            <center>
              <img
                className='app__headerImage'
                src='https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png'
                alt='instagram logo'
              />
            </center>

            <Input
              placeholder='email'
              type='text'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={signIn}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>
      <div className='app__header'>
        <img
          className='app__headerImage'
          src='https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png'
          alt='instagram logo'
        />
        {user ? (
          <>
            <Button onClick={() => auth.signOut()}>Log out</Button>
          </>
        ) : (
          <div className='app__loginContainer'>
            <Button onClick={() => setOpenSignIn(true)}>Login</Button>
            <Button onClick={() => setOpen(true)}>Sign up</Button>
          </div>
        )}
      </div>
      <div className='app__posts'>
        {posts.map(({ post, id }) => (
          <Post
            user={user}
            key={id}
            postId={id}
            imageUrl={post.imageUrl}
            caption={post.caption}
            username={post.username}
          />
        ))}
      </div>

      <footer>
        {user?.displayName ? (
          <>
            <h3 className='app__footerUpload'>Upload</h3>
            <ImageUpload username={user.displayName} />
          </>
        ) : (
          <h3 className='app__footerText'>Sorry you need to login to upload</h3>
        )}
      </footer>
    </div>
  );
}

export default App;
