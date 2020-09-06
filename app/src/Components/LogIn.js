import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom'
import '../Style/LogIn.css';
import {Firebase} from './firebase'
import { AuthContext } from '../context/authContext';
// import Home from './Home'


/*
TODO: Connect to firebase
TODO: Make login form a "popup window"
TODO: Forgot password link
*/



const LogIn = () => {
    const {toggleLoggedIn, isLoggedIn } = useContext(AuthContext)
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect( () => {
        document.getElementById("email").focus();
    }, [])

    

    const handleSubmit = (e) => {
        e.preventDefault()
        toggleLoggedIn(email, password)
        
    }

    
    //renders form if loggedIn = false
    if (isLoggedIn === false){
        return (
            <div className="sign-up-form">
                <form className="auth-form">
                    Email:
                    <input name="email" id="email" type="email" placeholder="Email" spellCheck='false' onChange={(e) => setEmail(e.target.value)}></input>
                    Password:
                    <input name="password" id="pass" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                    <span>
                        <button type="submit" onClick={handleSubmit}>LogIn!</button>
                        <a href="Forgot Password" id="forgot-pass">Recover Password</a>
                    </span>

                </form>
            </div>
        )
    } else {
        return (
            //redirect to Home screen
            <Redirect to="/" ></Redirect>
        )
    }
}


export default LogIn