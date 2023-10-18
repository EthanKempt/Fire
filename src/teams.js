import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs, updateDoc, doc, getDoc
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
        teams.push({ ...doc.data()})
     })
     sessionStorage.setItem('teams', JSON.stringify(teams));
  })
  .catch(err => {
    console.log(err.message)
  })

  window.reUpdate = function() {
    getDocs(colRef)
  .then((snapshot) => {
    window.teams = []
    snapshot.docs.forEach((doc) => {
        teams.push({ ...doc.data()})
     })
     sessionStorage.setItem('teams', JSON.stringify(teams));
  })
  .catch(err => {
    console.log(err.message)
  })
  }

  window.adminEdit = function(team, a, b, c, d) {
    const docRef = doc(db, 'teams', team)
    updateDoc(docRef, {
      player1: a,
      player2: b,
      player3: c
    })
    if (d) {
      updateDoc(docRef, {
        player4: d
      })
    }
  }