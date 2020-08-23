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
const docRef = db.collection("users")
const auth = firebase.auth();

class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            email: "",
            displayName: "",
            password: "",
            password_confirmation: ""
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
        auth.createUserWithEmailAndPassword(email, password)
            .then((cred) => {
                console.log(cred)
                db.collection("users").doc(email).collection("recipes").doc("initial").set({
                    title: "initial",
                    content: "This is where your recipes will show after you've added them you can delete this anytime."
                })
                
            })
            .catch(
            error => console.log(error)
            )   
        document.querySelector("#email").value = "";
        document.querySelector("#name").value = "";
        document.querySelector("#password").value = "";
        document.querySelector("#conf_password").value = "";
    }

    render() {
        return (
            <div className="sign-up-form">
                <form className="auth-form">
                    Email:
                    <input id="email" name="email" placeholder="Email" onChange={this.handleChange}></input>
                    Display Name:
                    <input id="name" name="displayName" placeholder="What should we call you?" onChange={this.handleChange}></input>
                    Password:
                    <input id="password" name="password" placeholder="Choose Password" onChange={this.handleChange}></input>
                    Confirm Password:
                    <input id="conf_password" name="password_confirmation" placeholder="Confirm Password" onChange={this.handleChange}></input>
                    <button type="submit" onClick={this.handleSubmit}>Sign Up!</button>
                </form>
            </div>
        )
    }
}

export default SignUp