
import './App.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({})
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handlegoogleSignin = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log('ebar dekho jadur khela:', user);
      })
      .catch(error => {
        console.error('error khaichi:', error);
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(() => {
        setUser({})
      })
  }

  const handleGithubSignin = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        setUser(user)
        console.log(user);
      })
      .catch(error => {
        console.error(error);
      })
  }
  return (
    <div className="App">
      {user.uid ?
        <button onClick={handleSignOut}>Sign Out</button>
        :
        <>
          <button onClick={handlegoogleSignin}>Sign In Google</button>
          <button onClick={handleGithubSignin}>Sign In GitHub</button>
        </>
      }
      {user.uid &&
        <div>
          <h2>username: {user.displayName}</h2>
          <p>email: {user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>}
    </div>
  );
}

export default App;
