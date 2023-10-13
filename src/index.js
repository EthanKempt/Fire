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
    let names = []
    snapshot.docs.forEach((doc) => {
        names.push({ ...doc.data(), id: doc.id })
    })
    if (checkUser()) {
      console.log(names[0].user1)
    }
  })
  .catch(err => {
    console.log(err.message)
  })

  function checkUser() {
    if (userIn == 'b') {
      return true;
    }else {
      return false;
    }
  }