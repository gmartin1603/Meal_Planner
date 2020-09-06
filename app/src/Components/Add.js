import React, { useState, useEffect } from "react";
import '../Style/Add.css'
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

const AddForm = () => {

  const [title, setTitle] = useState('')
  const [servings, setServings] = useState(null)
  const [prep, setPrep] = useState(null)
  const [cook, setCook] = useState(null)
  const [ingredients, setIngredients] = useState([])
  const [directions, setDirections] = useState([])
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')

  useEffect( () => {
    document.getElementById("title").focus()
    //gets user email and sets it in state to use for writting to the correct firestore collection
    auth.onAuthStateChanged(user => {
      if (user) {
        setEmail(user.email)
      } else {
        console.log("No user signed in")
      }
    })
  },[])
  
  
  

  //buiilds the new recipe doc and writes it to the users firestore collection
  const handleSubmit = () => {
    docRef.doc(email).collection("recipes").doc(title).set({
      "title": title,
      "servings": servings,
      "prep-time": prep,
      "cook-time": cook,
      "ingredients": ingredients,
      "directions": directions,
    })
    .then( () => {
      console.log("Document Successfully Written!");
    })
    .catch( (error) => {
      console.error("Error writing doc: ", error);
    })
    //clear form after submission
    clearForm()
  }

  //reset form to blank
  const clearForm = () => {
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

  //capitalizes each word of ingredients 
  const capitalize =(str) => {
    str = str.split(" ");

    for (let i = 0, x = str.length; i < x; i++){
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(" ");
    
  } 
  
  const addIngredient = (e) => {
    e.preventDefault();
    //builds individual ingredient object
    const ingredient = {
      name: capitalize(document.getElementById("ingr").value),
      qty: document.getElementById("qty").value,
      unit: document.getElementById("unit").value
    } //"pushes" the created object to the state.ingredients array
    setIngredients([...ingredients, ingredient])
    //clears ingredient form and puts focus on "ingr" field
    document.getElementById("ingr").value = ""
    document.getElementById("qty").value = ""
    document.getElementById("unit").value = null
    document.getElementById("ingr").focus()
  }

  // const ingredientDisabled = () => {
  //   if (document.getElementById("ingr").value === ""){
  //     document.getElementById("ingr-save").disabled = true
  //   }
  //   else {
  //     document.getElementById("ingr").disabled = false
  //   }
  // }

  //same theory as addIngredient
  const addDirection = (e) => {
    e.preventDefault();
    //increments this.state.step by 1 everytime a direction is added
    setStep(step+1)
    //individual directions are stored as objects
    const direction = {
      step: step,
      direction: document.getElementById("direction").value
    }
    setDirections([...directions, direction])
    document.getElementById("direction").value = ""
    document.getElementById("direction").focus()
  }

  // const deleteDirection = (step) => {
  //   //TODO
  // }
  
  return (
    <div className="main">
      <h2>Add Recipe</h2>
    <div className="container">
    <div className="form-container">
      <form className="add-form">
      <label>
        Title:
        <input name="title" id="title" type="text" onChange={(e) => {setTitle(e.target.value)}} />
      </label>
      <label>
        Servings:
        <input name="servings" id="servings" type="number" onChange={(e) => {setServings(e.target.value)}} />
      </label>
      <label>
        Prep Time (Mins):
        <input name="prep" id="prep" type="number" onChange={(e) => {setPrep(e.target.value)}} />
      </label>
      <label>
        Cook Time (Mins):
        <input name="cook" id="cook" type="number" onChange={(e) => {setCook(e.target.value)}} />
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
          <option value="pinch">Pinch</option>
        </select>
      <button id="ingr-save" type="submit" onClick={addIngredient}>Add Ingredient</button>
      <label>
        Directions: 
      </label> 
        <input id="direction" name="direction" placeholder="Direction" type="text" />
        <button type="submit" onClick={addDirection}>Add Direction</button>
        
      </form>
    </div>
    <div className="card">
      <div className="card-title">Title: <p>{title}</p></div>
      <div className="card-servings">Servings: <p>{servings}</p></div>
      <div className="card-prep">Prep Time (Mins): <p>{prep}</p></div>
      <div className="card-cook">Cook Time (Mins): <p>{cook}</p></div>
      <ul className="ingredients-list">Ingredients:
      { //renders ingredients as they are added to state
      ingredients.map(i => (
          <li key={i.name} className="card-ingredients">{i.name+" "+i.qty+i.unit+"."}</li>
      ))}
      </ul>
      <ul className="directions-list">Directions:
      { //renders directions as they are added to state
      directions.map((d) => (
          <li key={d.step} className="card-directions">{`${d.step+". "+d.direction}`} </li>
      ))}
      </ul>
      <button type="submit" onClick={handleSubmit}>Save Recipe</button>
    </div>
    </div>
    </div>
  );
  
}
 
export default AddForm;