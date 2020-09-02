import React, {useState} from 'react';
import { Redirect } from 'react-router-dom'
import '../Style/SignUp.css';
import firebase from './firebase'


/* 
TODO: Make sign up form a "popup window"
TODO: Validate "confirm password"
TODO: validate email
TODO: validate password lenth
TODO: validate paword charecters
*/


const db = firebase.firestore();
const auth = firebase.auth();

const SignUp = () => {

    const [email, setEmail] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)
    // const [error, setError] = useState(null)
    

    const handleSubmit = (e) => {
        e.preventDefault();
        //checks that "password" & "passwordConfirmation" fields are the same value
        if (password === passwordConfirmation){
            //creates new user in firebase
            auth.createUserWithEmailAndPassword(email, password)
                .then((cred) => {
                    let user = auth.currentUser;
                    user.updateProfile({
                        //sets profile displayname
                        displayName: displayName,
                    }) //creates the firestore path for the new user and sets an "inital" recipe doc 
                    db.collection("users").doc(email).collection("recipes").doc("initial").set({
                        title: "initial",
                        content: "This is where your recipes will show after you've added them you can delete this anytime."
                    })
                    
                }).then(setLoggedIn(true))
                .catch(
                error => alert(error)
                )
            //clears signup form
            
        } else {
            alert("'Confirm password' field must match 'Password' field")
            //clears password and confirm password fields for retry
            document.querySelector("#password").value = "";
            document.querySelector("#password").focus();
            document.querySelector("#conf_password").value = ""; 
        }
    }

    if (loggedIn === false) {
        return (
            <div className="sign-up-form">
                <form className="auth-form">
                    Email:
                    <input id="email" name="email" type="email" placeholder="Email" spellCheck="false" onChange={ (e) => setEmail(e.target.value)}></input>
                    Display Name:
                    <input id="name" name="displayName" type="text" placeholder="What should we call you?" onChange={ (e) => setDisplayName(e.target.value)}></input>
                    Password:
                    <input id="password" name="password" type="text" placeholder="Choose Password" onChange={ (e) => setPassword(e.target.value)}></input>
                    Confirm Password:
                    <input id="conf_password" name="password_confirmation" type="text" placeholder="Confirm Password" onChange={ (e) => setPasswordConfirmation(e.target.value)}></input>
                    <button type="submit" onClick={handleSubmit}>Sign Up!</button>
                </form>
            </div>
        )
    } else {
        return (<Redirect to="/"></Redirect>)
    }
}


export default SignUp