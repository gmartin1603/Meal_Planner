import React from 'react';
import './LogIn.css';
import firebase from './firebase'
import {createBrowserHistory} from "history"


/*
TODO: Connect to firebase
TODO: Make login form a "popup window"
TODO: Forgot password link
*/
const history = createBrowserHistory().replace("/");
const auth = firebase.auth();

class LogIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            loggedIn: false,
            email: "",
            password: "",
            
        }
    }

    componentDidMount() {
        document.getElementById("email").focus();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    logIn = (e) => {
        e.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        auth.signInWithEmailAndPassword(email, password).then(cred => {
            
        }).then(history)
        
        .catch(
            error => console.log(error)
        )
        document.getElementById("email").value = "";
        document.getElementById("pass").value = "";
        

    }

    render() {
        return (
            <div className="sign-up-form">
                <form className="auth-form">
                    Email:
                    <input name="email" id="email" type="email" placeholder="Email" onChange={this.handleChange}></input>
                    Password:
                    <input name="password" id="pass" type="password" placeholder="Password" onChange={this.handleChange}></input>
                    <span>
                        <button type="submit" onClick={this.logIn}>LogIn!</button>
                        <a href="Forgot Password" id="forgot-pass">Recover Password</a>
                    </span>

                </form>
            </div>
        )
    }
}

export default LogIn