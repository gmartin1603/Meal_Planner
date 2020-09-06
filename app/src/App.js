import React from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Recipes from "./Components/Recipes";
import GroceryList from "./Components/Grocery-List";
import AddForm from "./Components/Add";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import Recipe from './Components/Recipe';
import { AuthContextProvider } from './context/authContext';



const App = () => {
  return (
      <BrowserRouter>
      <AuthContextProvider>
        <div className="App">
          <Navbar/>
          <Route exact path="/" component={Home}/>
          <Route path="/Recipes" component={Recipes}/>
          <Route path="/Grocery-List" component={GroceryList}/>
          <Route path="/Add" component={AddForm}/>
          <Route path="/LogIn" component={LogIn}/>
          <Route path="/SignUp" component={SignUp}/>
          <Route path="/Recipe" component={Recipe}/>
        </div>
      </AuthContextProvider>
      </BrowserRouter>
    );
  
}

export default App;
