import React, { Component } from "react";
import firebase from './firebase';
import {
  // Route,
  NavLink,
} from "react-router-dom";
// import Recipe from "./Recipe";

const auth = firebase.auth();
const db = firebase.firestore();
const docRef = db.collection("users");

class Recipes extends Component {
  constructor(props) {
      super (props);
      this.state = { recipes: null, user: null };
      
    }
  //grabs recipe docs from user's firestore
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user.displayName })
        docRef.doc(user.email).collection("recipes").get().then(
          querySnapshot => {
            //intermidiate variable 
            const recipes = []
            querySnapshot.forEach(doc => {
              const data = doc.data()
              recipes.push(data)
              //sets state with all the recipes pulled from firestore
              this.setState({
                recipes: recipes
              })
            })
          }
        )
      } else {
        console.log("no user signed in")
      }
    })   
  }    
      
      
  render() {
    
    return (
      <div className="container">
        <div className="recipes">
          <h2>{this.state.user}'s Recipes</h2>
          <ul>
            {
              this.state.recipes &&
              this.state.recipes.map( recipes => {
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
}
 
export default Recipes;