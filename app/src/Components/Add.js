import React, { Component } from "react";
import './Add.css'
import firebase from './firebase';
// import { database } from "firebase";

/*
DONE: complete addDirection function
DONE: list directions as they are added
DONE: complete addIngredient function
DONE: list ingredients as they are added to side
DONE: clear form on submit
DONE: clear ingredient form after add
DONE: clear direction after add
DONE: function to push new recipe to firestore
DONE: Recipe card format preview?
TODO: Athenticate recipe input fields
*/
const auth = firebase.auth()
const db = firebase.firestore()
const docRef = db.collection("users")

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
      step: 1,
      email: ""
     }
    }

  componentDidMount() {
    document.getElementById("title").focus()
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          email: user.email
        })
      } else {
        console.log("No user signed in")
      }
    })
  }
  
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = () => {
    docRef.doc(this.state.email).collection("recipes").doc(this.state.title).set({
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
    document.getElementById("title").focus()
  }

  capitalize =(str) => {
    str = str.split(" ");

    for (let i = 0, x = str.length; i < x; i++){
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(" ");
    
  } 
  
  addIngredient = (e) => {
    e.preventDefault();
    const ingredient = {
      name: this.capitalize(document.getElementById("ingr").value),
      qty: document.getElementById("qty").value,
      unit: document.getElementById("unit").value
    }
    this.setState({ingredients: [...this.state.ingredients, ingredient]})
    document.getElementById("ingr").value = ""
    document.getElementById("qty").value = ""
    document.getElementById("unit").value = null
    document.getElementById("ingr").focus()
  }

  ingredientDisabled = () => {
    if (document.getElementById("ingr").value === ""){
      document.getElementById("ingr-submit").disabled = true
    }
    else {
      document.getElementById("ingr").disabled = false
    }
  }

  addDirection = (e) => {
    e.preventDefault();
    this.setState({step: this.state.step+1})
    const direction = {
      step: this.state.step,
      direction: document.getElementById("direction").value
    }
    this.setState({directions: [...this.state.directions, direction]})
    document.getElementById("direction").value = ""
    document.getElementById("direction").focus()
  }

  deleteDirection = (step) => {
    //TODO
  }
  
  
 
  render() {
    return (
      <div className="main">
        <h2>Add Recipe</h2>
      <div className="container">
      <div className="form-container">
        <form className="add-form">
        <label>
          Title:
        
          <input name="title" id="title" type="text" onChange={this.handleChange} />
        </label>
        <label>
          Servings:
          <input name="servings" id="servings" type="number" onChange={this.handleChange} />
        </label>
        <label>
          Prep Time (Mins):
          <input name="prep" id="prep" type="number" onChange={this.handleChange} />
        </label>
        <label>
          Cook Time (Mins):
          <input name="cook" id="cook" type="number" onChange={this.handleChange} />
        </label>
        <label>
        Ingedients: 
        </label> 
          <input id="ingr" name="ingredient" placeholder="Ingredient" type="text" />
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
        <button id="ingr-save" type="submit" onClick={this.addIngredient}>Add Ingredient</button>
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
      </div>
    );
  }
}
 
export default AddForm;