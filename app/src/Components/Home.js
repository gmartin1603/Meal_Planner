import React from 'react';
import './Home.css';
import firebase from './firebase'

const auth = firebase.auth()

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false,
      displayName: '',
    }
  }

  componentDidMount(){
    //checks for user
    auth.onAuthStateChanged(user => {
        
        if (user) {
            this.setState({
                loggedIn: true,
                displayName: user.displayName
            })
        }
        else {
            return
        }
    })
}

  render() {
      if (this.state.loggedIn === true) {
          return(
            //renders if user is logged in
            <div className="container">
              <h1 id="welcome-message">Welcome {this.state.displayName}!</h1>

            </div>
          )}
      else {
          return(
            //renders if no user is logged in
            <div className="home-container">
              <div id="welcome-message"><h1>Welcome!</h1></div>
              <div><p>This completly free website aims to make meal preping and home cooking easier for everyone!</p></div>
              <div><p>Click on "Sign Up" to create your account and start adding your favorite recipes.</p></div>
            </div> 
          )
      }  
  }
}
export default Home;