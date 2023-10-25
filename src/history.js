import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKEhJRciR51okIFqsFamrDqWsyRzTd2RE",
  authDomain: "higleyassassinsproject.firebaseapp.com",
  projectId: "higleyassassinsproject",
  storageBucket: "higleyassassinsproject.appspot.com",
  messagingSenderId: "237417001265",
  appId: "1:237417001265:web:1c4100d2b41e455cccc010",
  measurementId: "G-E7TK2NYFL4",
};

initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, "history");

getDocs(colRef)
  .then((snapshot) => {
    var history = [];
    snapshot.docs.forEach((doc) => {
      history.push({ ...doc.data(), id: doc.id });
      sessionStorage.setItem("history", JSON.stringify(history));
    });
  })
  .catch((err) => {
    console.log(err.message);
  });