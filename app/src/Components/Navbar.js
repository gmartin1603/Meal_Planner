import React, { Component } from "react";
import logo from './images/logo_transparent.png'
import {
    NavLink,
} from "react-router-dom";
import firebase from './firebase';
import Auth from './Auth'



const auth = firebase.auth();


class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            loggedIn: false,
            email: "",
            displayName: "",
            showModal: false,
            loading: false,
            error: null
        }
    }
    
    componentDidMount(){
        auth.onAuthStateChanged(user => {
            console.log(user)
            if (user) {
                this.setState({
                    loggedIn: true,
                    displayName: user.email
                })
            }
            else {
                return
            }
        })
    }

    logOut = () => {
        auth.signOut().then(() => {
            this.setState(
                { loggedIn: false }
            )
            console.log("Sign out successful")
        })
    }

    

    render() {
        if (this.state.loggedIn === true) {
            return (
                <header>
                    <div className="logo">
                        <img alt="Logo" src={logo}></img>
                    </div>

                    <nav className="nav-container">
                        <div> <NavLink exact to="/">Home</NavLink></div>
                        <div className="logged-in"> <NavLink to="/Recipes">Recipes</NavLink></div>
                        <div className="logged-in"> <NavLink to="/Grocery-List">Grocery List</NavLink></div>
                        <div className="logged-in"> <NavLink to="/Add">Add Recipe</NavLink></div>
                        <div className="logged-in">{this.state.displayName}</div>
                        <div className="logged-in"> <button onClick={this.logOut} >Log Out</button></div>   
                    </nav>    
                </header>
            )
        } else {
            return (
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
}

export default Navbar;