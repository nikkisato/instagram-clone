import './App.css';
import Post from './Components/Post/Post';
function App() {
  return (
    <div className='app'>
      <div className='app__header'>
        <img
          className='app__headerImage'
          src='https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png'
          alt='instagram logo'
        />
      </div>

      <Post
        imageUrl='https://res.cloudinary.com/practicaldev/image/fetch/s--54ca_F2q--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/1wwdyw5de8avrdkgtz5n.png'
        username='nikkisato'
        caption='WOW'
      />
      <Post />
      <Post />
    </div>
  );
}

export default App;
