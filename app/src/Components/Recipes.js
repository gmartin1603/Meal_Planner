import React, { Component } from "react";
import firebase from './firebase';
import 'firebase/auth'

const auth = firebase.auth();
const db = firebase.firestore();
const docRef = db.collection("users");

class Recipes extends Component {
  constructor(props) {
      super (props);
      this.state = { recipes: null, user: "" };
      console.log(props)
    }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        docRef.doc(user.email).collection("recipes").get().then(
          querySnapshot => {
            const recipes = []
            querySnapshot.forEach(doc => {
              const data = doc.data()
              recipes.push(data)
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
      
      // docRef.doc(user.email).collection("recipes").then(querySnapshot => {
      //   const recipes = []
      //   querySnapshot.forEach(doc => {
      //     const data = doc.data()
      //     recipes.push(data)
      //     // doc.data() is never undefined for query doc snapshots
      //     console.log(doc.id, " => ", doc.data())
      //     this.setState(
      //       { recipes: recipes }
  
  render() {
    
    return (
      <div className="container">
        <div className="recipes">
          <h2>Recipes</h2>
          <ul>
            {
              this.state.recipes &&
              this.state.recipes.map( recipes => {
                return (
                    <li key={recipes.title}>{recipes.title}</li>
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