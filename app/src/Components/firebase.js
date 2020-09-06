import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyAvJCB1T-yJKnA02lcQuSPnCDWne8dHFbc",
    authDomain: "meal-planner-7a232.firebaseapp.com",
    databaseURL: "https://meal-planner-7a232.firebaseio.com",
    projectId: "meal-planner-7a232",
    storageBucket: "meal-planner-7a232.appspot.com",
    messagingSenderId: "173736286395",
    appId: "1:173736286395:web:da165dae418fc5cef1b19e",
    measurementId: "G-3Q8NYX0L7Q"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

export const getCurrentUserName = () => {
  return auth.onAuthStateChanged(user => {
    if (user) {

      return user
    }
            
        }) 
}

export const signIn = (email, password) => {
  return(
    auth.signInWithEmailAndPassword(email, password).then(
      console.log('sign in successful')
    )
    
    ) 
    
}

export const logOut = () => {
  return auth.signOut()
}

export class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig)
    this.auth = firebase.auth()
    this.db = firebase.firestore()
    }

    logIn(email, password) {
      return this.auth.signInWithEmailAndPassword(email, password)
    }

    logOut() {
      return this.auth.signOut()
    }

    async register(name, email, password) {
      await this.auth.createUserWithEmailAndPassword(email, password)
      return this.auth.currentUser.updateProfile({
        displayName: name
      }).then(() => {
        this.db.collection("users").doc(email).collection("recipes").doc("initial").set({
          title: "initial",
          content: "This is where your recipes will show after you've added them you can delete this anytime."
      }).catch(error => {
        alert(error.message)
      })
      })
    }

    isInitialized() {
      return new Promise(resolve => {
        this.auth.onAuthStateChanged(resolve)
      })
    }

    getCurrentUserName = () => {
      return this.auth.currentUser() && {displayName: this.auth.currentUser().displayName, email: this.auth.User.email}
    }

    //grabs recipe docs from user's firestore
    getRecipes() {
      const user = Firebase.getCurrentUserName()
      const docRef = this.db.collection("users")
        if (user) {
          docRef.doc(user.email).collection("recipes").get().then(
            querySnapshot => {
              //intermidiate variable 
                let recipes = []
              querySnapshot.forEach(doc => {
                const data = doc.data()
                recipes.push(data)  
              })
              //sets state with all the recipes pulled from firestore
              return recipes
            }
          )
        } else {
          console.log("no user signed in")
        }
        
    }

    addRecipe(recipe) {
      const user = Firebase.getCurrentUserName()
      const docRef = this.db.collection("users")

      console.log(recipe)
    }
}

export default firebase