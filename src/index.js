import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs
} from 'firebase/firestore'
import { setTeams } from '/Users/ethan/Downloads/Fire/src/teams'

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

const colRef = collection(db, 'names')

getDocs(colRef)
  .then((snapshot) => {
    window.names = []
    snapshot.docs.forEach((doc) => {
        names.push({ ...doc.data(), id: doc.id })
    })
  })
  .catch(err => {
    console.log(err.message)
  })

  window.login = function() {
    userCheck(); //sets userIn and UserInP to current input
    for (let i = 0; i < names.length; i++) {
       if (userIn == names[i].name && userInP == names[i].password) {
        sessionStorage.setItem('currentUser', names[i].name);
        window.location.href = '/html/home.html';
        return true; //stops code from continuing
      } else if (i + 1 == names.length) {
        alert('incorrect username or password');
       }
    }
  }
  window.teams = setTeams();
  console.log(teams);