import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
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

const colRef = collection(db, "admin");

window.updateAdmin = new Promise((resolve, reject) => {
  getDocs(colRef)
    .then((snapshot) => {
      window.admin = [];
      snapshot.docs.forEach((doc) => {
        admin.push({ ...doc.data(), id: doc.id });
      });
      resolve(admin);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

window.savePot = function (a) {
  const docRef = doc(db, "admin", "admin");
  updateDoc(docRef, {
    pot: a,
  });
};

window.saveDate = function (a) {
  const docRef = doc(db, "admin", "admin");
  updateDoc(docRef, {
    startDate: a,
  });
};
