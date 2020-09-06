import React, { createContext } from 'react'
import {useHistory} from 'react-router'
import firebase,  { Firebase, getCurrentUserName, signIn, logOut } from '../Components/firebase'

export const AuthContext = createContext()

const auth = firebase.auth()

export class AuthContextProvider extends React.Component {
    constructor(props) {
        super (props)
        this.state = {
            isLoggedIn: false,
            displayName:'Guest',
            email: 'guest@guest.com',
        }
        this.setState = this.setState.bind(this)
        this.loggIn = this.loggIn.bind(this)
        this.loggOut = this.loggOut.bind(this)
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    isLoggedIn: !this.state.isLoggedIn,
                    displayName: user.displayName,
                    email: user.email
                })
            }
        })
        }

    loggIn(email, password) {
        signIn(email, password);
        getCurrentUserName((user) => {
            
        })
    }

    loggOut(){
        logOut()
        this.setState({
            isLoggedIn: false,
            displayName: 'Guest',
            email: 'guest@mealplanner.com'
        })    
    }

    render() {
        
        return(
            <AuthContext.Provider value={{...this.state, toggleLoggedIn: this.loggIn, loggOut: this.loggOut}}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

    
    

