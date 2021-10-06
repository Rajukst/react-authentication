import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initFirebase from './Firebase/firebase.init';
initFirebase();
const googleProvier = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()



function App() {
  const auth = getAuth()
  const [myUser, setUser] = useState({})
  const googleSign = () => {
    signInWithPopup(auth, googleProvier)
      .then(result => {
        const { displayName, photoURL, email } = result.user;
        const loggedUser = {
          name: displayName,
          img: photoURL,
          email: email
        }
        setUser(loggedUser)
      })
  }
  const signOutGoogle = () => {
    signOut(auth)
      .then(() => {
        setUser({});
        console.log('sign out successfully !!')
      })
  }
  const [github, setGithub] = useState({})
  const handleGithub = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const { displayName, photoURL } = result.user;
        const githubLooged = {
          getName: displayName,
          getImg: photoURL
        }
        setGithub(githubLooged)
      })
  }
  return (
    <div className="App">
      <button onClick={googleSign} >Google Sign in</button>
      <button onClick={signOutGoogle} >Sign Out Google </button>
      <button onClick={handleGithub}> Github</button>
      {
        myUser.name && <div>
          <h1>Your Name is: {myUser.name}</h1>
          <h2>Your email is: {myUser.email}</h2>
          <img src={myUser.img} alt="" />
        </div>
      }
      {
        github.getName && <div>
          <h1>Your Name is: {github.getName}</h1>

          <img src={github.getImg} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
