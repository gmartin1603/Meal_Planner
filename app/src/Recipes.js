import React, { Component } from "react";
import firebase from './firebase';

let db = firebase.firestore();
let docRef = db.collection("users").doc("george").collection("recipes");

class Recipes extends Component {
  constructor(props) {
      super (props);
      this.state = { recipes: null };
    }


    // componentDidMount() {
    //   fetch("http://localhost:9000/API/recipes")
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState(
    //         { recipes: data });
    //         console.log(this.state.recipes);
    //     })
    //     .catch(error => console.log(error));
    // }
  componentDidMount() {
    docRef.get().then(querySnapshot => {
      const recipes = []
      querySnapshot.forEach(doc => {
        const data = doc.data()
        recipes.push(data)
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      })
      this.setState(
          { recipes: recipes }
        )
    })
    .catch( error => console.log(error))
  } 
  

  
    
  render() {
    
    return (
      <div className="container">
        <div className="recipes">
          <h2>Recipes</h2>
            {
              this.state.recipes &&
              this.state.recipes.map( recipes => {
                return (
                  <div>
                    <p>{recipes.title}</p>
                  </div>
                )
              })
            }
        </div>
      </div>
    )
  }
}
 
export default Recipes;