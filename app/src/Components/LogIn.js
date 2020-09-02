import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import '../Style/LogIn.css';
import firebase from './firebase'
// import Home from './Home'


/*
TODO: Connect to firebase
TODO: Make login form a "popup window"
TODO: Forgot password link
*/

const auth = firebase.auth();

const LogIn = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect( () => {
        document.getElementById("email").focus();
    }, [])

    

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(cred => {    
        }).then( 
                () => {setLoggedIn(true)
            })
        .catch(
            error => console.log(error)
        )
        document.getElementById("email").value = "";
        document.getElementById("pass").value = "";
    }

    
    //renders form if loggedIn = false
    if (loggedIn === false){
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