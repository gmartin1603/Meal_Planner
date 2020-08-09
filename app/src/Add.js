import React, { Component } from "react";
import './Add.css'
import firebase from './firebase';

/*
TODO: function to convert baking unit to ozs
TODO: function to bulid recipe to add to firestore
DONE: complete addDirection function
TODO: list directions as they are added
DONE: complete addIngredient function
TODO: list ingredients as they are added to side
TODO: clear form on submit
DONE: clear ingredient form after add
DONE: clear direction after add
TODO: function to push new recipe to firestore
*/

const ingredientsList = []
const directionsList = []

class AddForm extends Component {
  constructor(props) {
    super (props);
    this.state = { 
      title: "",
      servings: 0,
      prep: 0,
      ingredient: "",
      qty: 0,
      unit: null,
      direction: "",
      step: 1
     }
    }

  
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }
  
  addIngredient = (e) => {
    e.preventDefault();
    const ingredient = {
      ingredient: this.state.ingredient,
      qty: this.state.qty,
      unit: this.state.unit
    }
    ingredientsList.push(ingredient)
    document.getElementById("ingr").value = ""
    document.getElementById("qty").value = ""
    document.getElementById("unit").value = null
    console.log(ingredientsList) 
  }

  addDirection = (e) => {
    e.preventDefault();
    this.setState({step: this.state.step+1})
    const direction = {
      step: this.state.step,
      direction: this.state.direction
    }
    directionsList.push(direction)
    document.getElementById("direction").value = ""
    console.log(directionsList)
  }
  
 
  render() {
    return (
      <div className="container">
        <h2>Add Recipe</h2>
        <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input name="title" type="text" onChange={this.handleChange} />
          Servings:
          <input name="servings" type="number" onChange={this.handleChange} />
          Prep Time (Mins):
          <input name="prep" type="number" onChange={this.handleChange} />
        </label>
        <label>
        Ingedients: 
        </label> 
          <input id="ingr" name="ingredient" placeholder="Ingredient" type="text" onChange={this.handleChange} />
          <input id="qty" name="qty" type="number" placeholder="Quantity" onChange={this.handleChange}></input>
          <select id="unit" name="unit" onChange={this.handleChange}>
            <option value="null">Unit of Measure</option>
            <option value="C">C</option>
            <option value="tsp">tsp</option>
            <option value="tbsp">tbsp</option>
            <option value="oz">oz</option>
            <option value="lb">lb</option>
          </select>
        <button type="submit" onClick={this.addIngredient}>Add Ingredient</button>
        <label>
          Directions: 
        </label> 
          <input id="direction" name="direction" placeholder="Direction" type="text" onChange={this.handleChange} />
          <button type="submit" onClick={this.addDirection}>Add Direction</button>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}
 
export default AddForm;