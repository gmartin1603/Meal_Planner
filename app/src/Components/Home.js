import React, { useState, useEffect } from 'react';
import '../Style/Home.css';
import firebase from './firebase'

const auth = firebase.auth()

const Home = (props) => {
  
  let [loggedIn, setLoggedIn] = useState(false)
  let [displayName, setDisplayName] = useState('Guest')

  useEffect( () => {
    //checks for user
    auth.onAuthStateChanged(user => {
        
        if (user) {
            setLoggedIn(true)
            setDisplayName(user.displayName)
        }
        else {
            return
        }
    })
  })
  
      if (loggedIn === true) {
          return(
            //renders if user is logged in
            <div className="container">
              <h1 id="welcome-message">Welcome {displayName}!</h1>

            </div>
          )}
      else {
          return(
            //renders if no user is logged in
            <div className="home-container">
              <div id="welcome-message"><h1>Welcome {displayName}!</h1></div>
              <div><p>This completly free website aims to make meal preping and home cooking easier for everyone!</p></div>
              <div><p>Click on "Sign Up" to create your account and start adding your favorite recipes.</p></div>
            </div> 
          )
      }  
  }

export default Home;