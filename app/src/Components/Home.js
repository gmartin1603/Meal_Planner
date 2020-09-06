import React, { useState, useEffect, useContext } from 'react';
import '../Style/Home.css';
import { AuthContext } from '../context/authContext';



const Home = (props) => {
  
  const {toggleLoggedIn, isLoggedIn, displayName} = useContext(AuthContext)

      if (isLoggedIn === true) {
          return(
            //renders if user is logged in
            <div className="home-container">
              <h1 id="welcome-message">Welcome {displayName}!</h1>
              <div><p>This is your home screen. Not sure what else.</p></div>
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