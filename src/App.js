import React, { useState, useEffect } from 'react';
import './App.css';
import { db, auth } from './firebase';
import Post from './Components/Post/Post';
import { Modal, Button, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
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
        //user has logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        //user has logged out
        setUser(null);
      }
    });
    return () => {
      //perform clean up actions
      unsubscribe();
    };
  }, [user, username]);

  const signUp = event => {
    event.PreventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return authUser.user.updateProfile({
          displayUser: username,
        });
      })
      .catch(error => alert(error.message));

    setOpen(false);
  };

  const signIn = event => {
    event.PreventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => alert(error.message));

    setOpenSignIn(false);
  };

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
      </div>
      {user ? (
        <Button onClick={() => auth.signOut()}>Log out</Button>
      ) : (
        <div className='app__loginContainer'>
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign up</Button>
        </div>
      )}
      {posts.map((post, id) => (
        <Post
          key={id}
          imageUrl={post.imageUrl}
          caption={post.caption}
          username={post.username}
        />
      ))}
    </div>
  );
}

export default App;
