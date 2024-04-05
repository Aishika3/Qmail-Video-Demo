import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { FaLinkedin } from 'react-icons/fa';
import { FaTwitter, FaMailBulk, FaArrowAltCircleRight } from 'react-icons/fa';
import { useContext } from 'react';
import { UserRecordContext } from '../../UserRecordContext';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, sendSignInLinkToEmail } from "firebase/auth";


function Login() {
  const [userRecord, setUserRecord] = useContext(UserRecordContext);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  const auth = getAuth();

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'http://localhost:3000/main',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'quirkmail.page.link'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email);
        alert("Mail sent")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
  };

  return (
    <div className="w-full wrapper">

      <form className="bg-gray-400 rounded-lg shadow-lg mt-[75px] p-10 lg:w-[50%] md:w-[50%] w-[80%] mx-auto " onSubmit={handleSubmit}>
      <div className="w-40 mx-auto mb-6">
        <img src="https://drive.google.com/uc?id=1FMx7tMoGwhM2woHgEeGN6BUWsjH65dBj" alt="" />
      </div>
        
        <div className="w-[80%] mx-auto flex flex-row">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full perimeter bg-gray-400 h-12 rounded-md p-2"
            
          />
          <FaMailBulk color='#FFF' className='h-12 w-12 mx-2'/>
        </div>

        <div className="flex flex-col items-center mb-4 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="h-12 bg-gray-400 rounded-xl font-semibold perimeter mx-auto px-4 py-2 text-white text-lg"
          >
            {loading ? 'Loading...' : 'Login'}
            <FaArrowAltCircleRight className='my-auto mx-2' color='567d46'/>
          </button>

          <div className='my-4 text-white'>OR</div>
          <button
            type="button"
            className="h-12 bg-gray-400 rounded-xl font-semibold perimeter mx-auto px-4 py-2 text-white text-lg"
          >
            Sign Up
          </button>
        </div>
        
        <div className='grid grid-cols-2 my-2 w-[20%] mx-auto'>
          <FaLinkedin className='outer text-white h-8 w-8 mx-auto'/>
          <FaTwitter className='outer text-white h-8 w-8 mx-auto'/>
        </div>
      </form>
    </div>

  );
};

export default Login;
