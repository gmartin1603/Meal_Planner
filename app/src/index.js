import React, { Context } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from './Components/firebase'

const auth = firebase.auth()

const userStatus = () => {
  auth.onAuthStateChanged(user => {
  if (user) {
          setLoggedIn(true)
          setDisplayName(user.displayName)   
  }
  else {
      return
  }
})
}


ReactDOM.render(
  <React.StrictMode>
    <userStatus.provider >
      <App />
    </userStatus.provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
