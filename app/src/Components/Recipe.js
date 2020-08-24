import React from 'react'
// import firebase from 'firebase'
// import Recipes from './Recipes'


class Recipe extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            title:"",
            servings: null,
            cookTime: null,
            prepTime: null,
            ingredients:[],
            directions:[],
        }
    }

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return(
            <div className="cont">
                <div><h1>{this.state.title}</h1></div>
            </div>
        )
    }
}

export default Recipe