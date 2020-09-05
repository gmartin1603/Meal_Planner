import React, { createContext, useState, useEffect } from 'react'
import {toggleAuthState} from '../Components/firebase'

export const AuthContext = createContext()



        

export const AuthContextProvider = (props) => {
    
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [displayName, setDisplayName] = useState('Guest')
    const [email, setEmail] = useState('guest@guest.com')
    
    useEffect(() => {
        const unsubscribe = toggleAuthState()
        
        return () => {
          unsubscribe()
          console.log(unsubscribe)
          console.log(loggedIn())
        }
      }, [])

    

    const loggedIn = () => {
        console.log(displayName, ' Logged In')
            }

    
        return(
            <AuthContext.Provider value={{isLoggedIn, displayName, email}}>
                {props.children}
            </AuthContext.Provider>
        );
    
}
