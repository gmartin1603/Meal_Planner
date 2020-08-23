import React from 'react'
import firebase from './firebase'
import {
    NavLink,
} from "react-router-dom";
import './Auth.css'

const auth = firebase.auth();

class Auth extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            IsLoggedIn: false,
            displayName:""
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            console.log(user)
            if (user) {
                this.setState({
                    isLoggedIn: true,
                    displayName: user.email
                })
            }
            else {
                return
            }
        })
    }

    logOut = (e) => {
        // e.preventDefault();
        auth.signOut();
    }

    render() {
        if(this.state.isLoggedIn){
            return(
                <div className="auth-container">
                    Hi, {this.state.displayName} <button type="submit" onClick={this.logOut} >Log Out</button></div>
            )
        }
        else{
            return(
                <div className="auth-container">
                <NavLink to="/LogIn" >Log In</NavLink>
                <NavLink to="/SignUp" >Sign Up</NavLink>
                </div>
                
            )
        }
    }
}

export default Auth