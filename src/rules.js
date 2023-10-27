import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";

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

const colRef = collection(db, "rules");

getDocs(colRef)
  .then((snapshot) => {
    var rules = [];
    snapshot.docs.forEach((doc) => {
      rules.push({ ...doc.data(), id: doc.id });
      sessionStorage.setItem("rules", JSON.stringify(rules));
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

window.updateTitles = function (a, b, c) {
  var titlesArray = a;
  var rulesArray = b;
  var checked = c;
  console.log(checked)
  var rules = JSON.parse(sessionStorage.rules);
  for (let z = 0; z < rules.length; z++) {
    let current = rules[z].id;
    deleteDoc(doc(db, 'rules', current));
  }
  for (let y = 0; y < titlesArray.length; y++) {
    setDoc(doc(db, "rules", titlesArray[y]), {
      rule: rulesArray[y],
      order: y,
      enabled: checked[y],
    });
  }
};
