import React, { useState, useEffect } from "react";
import logo from '../images/logo_transparent.png'
import {
    NavLink,
} from "react-router-dom";
import firebase from './firebase';




const auth = firebase.auth();


const Navbar = () => {
    
    const [loggedIn, setLoggedIn] = useState(false)
    const [displayName, setDisplayName] = useState('')

    
    useEffect( () => {
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

    const logOut = () => {
        auth.signOut().then(() => {
            setLoggedIn(false)  
            console.log("Sign out successful")
        })
    }

    
    if (loggedIn === true) {
        return (
            //renders if user is logged in
            <header>
                <div className="logo">
                    <img alt="Logo" src={logo}></img>
                </div>

                <nav className="nav-container">
                    <div> <NavLink exact to="/">Home</NavLink></div>
                    <div className="logged-in"> <NavLink to="/Recipes">Recipes</NavLink></div>
                    <div className="logged-in"> <NavLink to="/Grocery-List">Grocery List</NavLink></div>
                    <div className="logged-in"> <NavLink to="/Add">Add Recipe</NavLink></div>
                    <div className="logged-in" id="message">Hi, {displayName}</div>
                    <div className="logged-in"> <button onClick={logOut} >Log Out</button></div>   
                </nav>    
            </header>
        )
    } else {
        return (
            //renders if no user is logged in
            <header>
                <div className="logo">
                    <img alt="Logo" src={logo}></img>
                </div>

                <nav className="nav-container">
                    <div> <NavLink exact to="/">Home</NavLink></div>
                    <div className="logged-out"> <NavLink to="/LogIn" >Log In</NavLink></div>
                    <div className="logged-out"> <NavLink to="/SignUp" >Sign Up</NavLink></div>
                    
                </nav>    
            </header>
        )
    }  
}

export default Navbar;