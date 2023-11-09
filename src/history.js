import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
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

window.updateHistory = function () {
  getDocs(colRef)
    .then((snapshot) => {
      var history = [];
      snapshot.docs.forEach((doc) => {
        history.push({ ...doc.data(), id: doc.id });
      });
      sessionStorage.setItem("history", JSON.stringify(history));
    })
    .catch((err) => {
      console.log(err.message);
    });
};

window.saveHistory = function (random) {
  var history = JSON.parse(sessionStorage.history);
  let size = history.length + 1;
  let thisWeek = "week" + size;
  setDoc(doc(db, "history", thisWeek), {});
  let order = random;
  for (let a = 0; a < order.length; a++) {
    var pers = order[a];
    if (a + 1 == order.length) {
      var b = 0;
    } else {
      var b = a + 1;
    }
    let target = order[b];
    const docRef = doc(db, "history", thisWeek);
    updateDoc(docRef, {
      [pers]: target,
    });
  }
};
