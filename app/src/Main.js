import React, { Component } from "react";
import logo from './images/logo_transparent.png'
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
  import Home from "./Home";
  import Recipes from "./Recipes";
  import GroceryList from "./Grocery-List";
  import AddForm from "./Add";
class Main extends Component {

    render() {
        return(

            <HashRouter>
                <header>
                    <div className="logo">
                        <img alt="Logo" src={logo}></img>
                    </div>

                    <nav className="nav-container">
                        <div> <NavLink to="/Home">Home</NavLink></div>
                        <div> <NavLink to="/Recipes">Recipes</NavLink></div>
                        <div> <NavLink to="/Grocery-List">Grocery List</NavLink></div>
                        <div> <NavLink to="/Add">Add Recipe</NavLink></div>
                    </nav> 
                    <div className="search-container">
                        <input type="text" placeholder="Search" className="search"></input>
                    </div>     
                </header>
                <div className="content">
                    <Route exact path="/Home" component={Home}/>
                    <Route path="/Recipes" component={Recipes}/>
                    <Route path="/Grocery-List" component={GroceryList}/>
                    <Route path="/Add" component={AddForm}/>
                </div>
            </HashRouter>
          
        );
    }   
}

export default Main;