import React, { useState, useEffect, useContext } from "react";
import firebase from './firebase';
import {
  // Route,
  NavLink,
} from "react-router-dom";
import '../Style/Recipes.css'
import {ThemeContext} from '../context/themeContext'
// import Recipe from "./Recipe";

const auth = firebase.auth();
const db = firebase.firestore();
const docRef = db.collection("users");

const Recipes = () => {
  
  const { isLightTheme, light, dark } = useContext(ThemeContext)
  const theme = isLightTheme? light : dark
  
  const [user, setUser] = useState('')
  const [recipes, setRecipes] = useState(null)

  //grabs recipe docs from user's firestore
  useEffect( () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user.displayName)
        docRef.doc(user.email).collection("recipes").get().then(
          querySnapshot => {
            //intermidiate variable 
              let recipes = []
            querySnapshot.forEach(doc => {
              const data = doc.data()
              recipes.push(data)  
            })
            //sets state with all the recipes pulled from firestore
            setRecipes(recipes)
          }
        )
      } else {
        console.log("no user signed in")
      }
    })   
  }, [])
    
  return (
    <div className="container">
      <div className="recipes">
        <h2>{user}'s Recipes</h2>
        
          {
            recipes &&
            recipes.map( recipes => {
              return (
                <div style={{background: theme.bg, color: theme.chars}} className="card-body">
                  <NavLink style={{color: theme.chars }} to='./Recipe'>{recipes.title}</NavLink>
                </div>
                  )
                })
              }
        
      </div>
    </div>
  )
  
}
 
export default Recipes;