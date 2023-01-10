import React, {  useContext } from 'react';
import './Home.css';
// import { Navigate } from "react-router-dom";
import { auth, googleAuthProvider } from '../../utils/Firebase';
import { signInWithPopup } from 'firebase/auth';
import { AuthContext } from "../../Router";

export default function Home() {

  const { user, setUser } = useContext(AuthContext);

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const pic = result.user.photoURL;

        setUser({
          userName: name,
          userEmail: email,
          userPic: pic
        });

        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('pic', pic);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // if (user.userEmail) {
  //   return <Navigate to="/search/" />
  // }

  return (
    <div className="home-page">
      <div>
        {user.userEmail ?
          <h1> Welcome {user.userName} !!</h1> :
          <button className="login-with-google-btn" onClick={signInWithGoogle}>
            Sign in with Google
          </button>}
      </div>
    </div>
  );
}
