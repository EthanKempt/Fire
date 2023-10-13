import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAKEhJRciR51okIFqsFamrDqWsyRzTd2RE",
    authDomain: "higleyassassinsproject.firebaseapp.com",
    projectId: "higleyassassinsproject",
    storageBucket: "higleyassassinsproject.appspot.com",
    messagingSenderId: "237417001265",
    appId: "1:237417001265:web:1c4100d2b41e455cccc010",
    measurementId: "G-E7TK2NYFL4"
  };

initializeApp(firebaseConfig)

const db = getFirestore()

const colRef = collection(db, 'teams')

getDocs(colRef)
  .then((snapshot) => {
    window.teams = []
    snapshot.docs.forEach((doc) => {
        teams.push({ ...doc.data(), id: doc.id })
    })
  })
  .catch(err => {
    console.log(err.message)
  })

  window.login = function() {
    userCheck(); //sets userIn to current username input
    for (let i = 0; i < teams.length; i++) {
      let x = i + 1;
      let currentUser = users + x;
      console.log(currentUser)
      if (userIn == teams[0].currentUser) {
        console.log('true')
        return true;
      }else {
        console.log('false')
      } 
    }
  }