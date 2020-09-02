import React, { useState, useEffect } from "react";
import firebase from './firebase';
import {
  // Route,
  NavLink,
} from "react-router-dom";
// import Recipe from "./Recipe";

const auth = firebase.auth();
const db = firebase.firestore();
const docRef = db.collection("users");

const Recipes = () => {
  
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
        <ul>
          {
            recipes &&
            recipes.map( recipes => {
              return (
                  <li key={recipes.title}><NavLink to='./Recipe'>{recipes.title}</NavLink></li>
                  )
                })
              }
        </ul>
      </div>
    </div>
  )
  
}
 
export default Recipes;