import React, { useState, useEffect, useContext } from "react";
import logo from '../images/logo_transparent.png'
import {
    NavLink,
} from "react-router-dom";
import firebase from './firebase';
import ThemeToggle from "./ThemeButton";
import { ThemeContext } from "../context/themeContext";
import '../Style/NavBar.css'



const auth = firebase.auth();


const Navbar = () => {

    const { isLightTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme? light : dark

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
            <header style={{background: theme.bg}} >
                <div className="logo">
                    <img alt="Logo" src={logo}></img>
                    <ThemeToggle/>
                </div>

                <nav  className="nav-container">
                    <div> <NavLink style={{color: theme.chars}} exact to="/">Home</NavLink></div>
                    <div> <NavLink style={{color: theme.chars}} to="/Recipes">Recipes</NavLink></div>
                    <div> <NavLink style={{color: theme.chars}} to="/Grocery-List">Grocery List</NavLink></div>
                    <div> <NavLink style={{color: theme.chars}} to="/Add">Add Recipe</NavLink></div>
                    <div id="message" style={{color: theme.chars}} >Hi, {displayName}</div>
                    <div> <button style={{backgroundColor: theme.ui, color: theme.chars}} onClick={logOut} >Log Out</button></div>   
                </nav>    
            </header>
        )
    } else {
        return (
            //renders if no user is logged in
            <header style={{background: theme.bg}} >
                <div className="logo">
                    <img alt="Logo" src={logo}></img>
                    <ThemeToggle/>
                </div>

                <nav className="nav-container">
                    <div> <NavLink style={{color: theme.chars}} exact to="/">Home</NavLink></div>
                    <div className="logged-out"> <NavLink style={{color: theme.chars}} to="/LogIn" >Log In</NavLink></div>
                    <div className="logged-out"> <NavLink style={{color: theme.chars}} to="/SignUp" >Sign Up</NavLink></div>
                    
                </nav>    
            </header>
        )
    }  
}

export default Navbar;