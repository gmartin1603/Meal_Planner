import React from 'react';
import './SignUp.css';
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

class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            email: "",
            displayName: "",
            password: "",
            password_confirmation: "",
            error: null
         }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value, 
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let email = this.state.email;
        let password = this.state.password;
        let password_confirmation = this.state.password_confirmation;
        //checks that "password" & "password_confirmation" fields are the same value
        if (password === password_confirmation){
            //creates new user in firebase
            auth.createUserWithEmailAndPassword(email, password)
                .then((cred) => {
                    let user = auth.currentUser;
                    user.updateProfile({
                        //sets profile displayname
                        displayName: this.state.displayName,
                    }) //creates the firestore path for the new user and sets an "inital" recipe doc 
                    db.collection("users").doc(email).collection("recipes").doc("initial").set({
                        title: "initial",
                        content: "This is where your recipes will show after you've added them you can delete this anytime."
                    })
                    
                })
                .catch(
                error => alert(error)
                )
            //clears signup form
            document.querySelector("#email").value = "";
            document.querySelector("#name").value = "";
            document.querySelector("#password").value = "";
            document.querySelector("#conf_password").value = "";
        } else {
            alert("'Confirm password' field must match 'Password' field")
            //clears password and confirm password fields for retry
            document.querySelector("#password").value = "";
            document.querySelector("#password").focus();
            document.querySelector("#conf_password").value = ""; 
        }
    }

    render() {
        return (
            <div className="sign-up-form">
                <form className="auth-form">
                    Email:
                    <input id="email" name="email" type="email" placeholder="Email" onChange={this.handleChange}></input>
                    Display Name:
                    <input id="name" name="displayName" type="text" placeholder="What should we call you?" onChange={this.handleChange}></input>
                    Password:
                    <input id="password" name="password" type="password" placeholder="Choose Password" onChange={this.handleChange}></input>
                    Confirm Password:
                    <input id="conf_password" name="password_confirmation" type="password" placeholder="Confirm Password" onChange={this.handleChange}></input>
                    <button type="submit" onClick={this.handleSubmit}>Sign Up!</button>
                </form>
            </div>
        )
    }
}

export default SignUp