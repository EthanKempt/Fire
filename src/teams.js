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
    createTeamsVar(teams);
  })
  .catch(err => {
    console.log(err.message)
  })
function createTeamsVar(a) {
 window.teams = a;
}

  window.setTeams = function() {
    return teams;
  }