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

const colRef = collection(db, 'names')

getDocs(colRef)
  .then((snapshot) => {
    window.names = []
    snapshot.docs.forEach((doc) => {
        names.push({ ...doc.data(), id: doc.id })
        sessionStorage.setItem('names', JSON.stringify(names));
    })
  })
  .catch(err => {
    console.log(err.message)
  })

  window.login = function() {
    userCheck(); //sets userIn and UserInP to current input
    for (var i = 0; i < names.length; i++) {
      if (i < teams.length) {
      var teamsName = JSON.parse(sessionStorage.teams)[i].teamName;
      var teamsPassword = JSON.parse(sessionStorage.teams)[i].teamPass;
      }
      var userName = JSON.parse(sessionStorage.names)[i].name;
      var userPassword = JSON.parse(sessionStorage.names)[i].password;
      if (userIn == teamsName && userInP == teamsPassword) {
        sessionStorage.setItem('currentTeam', teamsName);
        window.location.href = '/html/home.html';
        return true; //stops code from continuing
      } else if (userIn == userName && userInP == userPassword) {
        var userTeam = JSON.parse(sessionStorage.names)[i].team;
        sessionStorage.setItem('currentTeam', userTeam);
        window.location.href = '/html/home.html';
        return true; //stops code from continuing
      } else if (i + 1 == names.length) {
        alert('incorrect username or password');
       }
    }
  }