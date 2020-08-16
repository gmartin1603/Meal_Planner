import React, { Component } from "react";
import './Add.css'
import firebase from './firebase';
// import { database } from "firebase";

/*
DONE: complete addDirection function
DONE: list directions as they are added
DONE: complete addIngredient function
DONE: list ingredients as they are added to side
TODO: clear form on submit
DONE: clear ingredient form after add
DONE: clear direction after add
DONE: function to push new recipe to firestore

Recipe card format preview?
*/

const db = firebase.firestore()
const docRef = db.collection("users").doc("george").collection("recipes")

class AddForm extends Component {
  constructor(props) {
    super (props);
    this.state = { 
      title: "",
      servings: null,
      prep: null,
      cook: null,
      ingredients: [],
      directions: [],
      step: 1
     }
    }

  
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = () => {
    docRef.doc(this.state.title).set({
      "title": this.state.title,
      "servings": this.state.servings,
      "prep-time": this.state.prep,
      "cook-time": this.state.cook,
      "ingredients": this.state.ingredients,
      "directions": this.state.directions,
    })
    .then( () => {
      console.log("Document Successfully Written!");
    })
    .catch( (error) => {
      console.error("Error writing doc: ", error);
    })
    this.clearForm()
  }

  clearForm = () => {
    this.setState({ 
      title: "",
      servings: null,
      prep: null,
      cook: null,
      ingredients: [],
      directions: [],
      step: 1
     });
    document.getElementById("title").value = ""
    document.getElementById("servings").value = null
    document.getElementById("prep").value = null
    document.getElementById("cook").value = null
  }
  
  addIngredient = (e) => {
    e.preventDefault();
    const ingredient = {
      name: document.getElementById("ingr").value,
      qty: document.getElementById("qty").value,
      unit: document.getElementById("unit").value
    }
    this.state.ingredients.push(ingredient)
    document.getElementById("ingr").value = ""
    document.getElementById("qty").value = ""
    document.getElementById("unit").value = null
  }

  addDirection = (e) => {
    e.preventDefault();
    this.setState({step: this.state.step+1})
    const direction = {
      step: this.state.step,
      direction: document.getElementById("direction").value
    }
    this.state.directions.push(direction)
    document.getElementById("direction").value = ""
    
  }

  deleteDirection = (step) => {
    //TODO
  }
  
  
 
  render() {
    return (
      <div className="main">
        <h2>Add Recipe</h2>
      <div className="container">
        <form>
        <label>
          Title:
          <input name="title" id="title" type="text" onChange={this.handleChange} />
          Servings:
          <input name="servings" id="servings" type="number" onChange={this.handleChange} />
          Prep Time (Mins):
          <input name="prep" id="prep" type="number" onChange={this.handleChange} />
          Cook Time (Mins):
          <input name="cook" id="cook" type="number" onChange={this.handleChange} />
        </label>
        <label>
        Ingedients: 
        </label> 
          <input id="ingr" name="ingredient" placeholder="Ingredient" type="text"  />
          <input id="qty" name="qty" type="number" placeholder="Quantity" ></input>
          <select id="unit" name="unit" >
            <option value="null">Unit of Measure</option>
            <option value="C">C</option>
            <option value="tsp">tsp</option>
            <option value="tbsp">tbsp</option>
            <option value="oz">oz</option>
            <option value="lb">lb</option>
            <option value="whole">Whole</option>
          </select>
        <button type="submit" onClick={this.addIngredient}>Add Ingredient</button>
        <label>
          Directions: 
        </label> 
          <input id="direction" name="direction" placeholder="Direction" type="text" />
          <button type="submit" onClick={this.addDirection}>Add Direction</button>
          
        </form>
      </div>
      <div className="card">
        <div className="card-title">Title: <p>{this.state.title}</p></div>
        <div className="card-servings">Servings: <p>{this.state.servings}</p></div>
        <div className="card-prep">Prep Time (Mins): <p>{this.state.prep}</p></div>
        <div className="card-cook">Cook Time (Mins): <p>{this.state.cook}</p></div>
        <ul className="ingredients-list">Ingredients:
        {
        this.state.ingredients.map(i => (
            <li key={i.name} className="card-ingredients">{i.name+" "+i.qty+i.unit+"."}</li>
        ))}
        </ul>
        <ul className="directions-list">Directions:
        {
        this.state.directions.map((d) => (
            <li key={d.step} className="card-directions">{`${d.step+". "+d.direction}`} </li>
        ))}
        </ul>
        <button type="submit" onClick={this.handleSubmit}>Save Recipe</button>
      </div>

      </div>
    );
  }
}
 
export default AddForm;