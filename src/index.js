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
      var teamsName = JSON.parse(sessionStorage.teams)[i].teamName;
      var teamsPassword = JSON.parse(sessionStorage.teams)[i].teamPass;
      if (userIn == teamsName && userInP == teamsPassword) {
        sessionStorage.setItem('currentTeam', teams[i].teamName);
        window.location.href = '/html/home.html';
        return true; //stops code from continuing
      } else if (i + 1 == names.length) {
        alert('incorrect username or password');
       }
    }
  }

  //userIn == names[i].name && userInP == names[i].password || 