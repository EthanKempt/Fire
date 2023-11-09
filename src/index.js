import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
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

const colRef = collection(db, "names");

window.updateUsers = new Promise((resolve, reject) => {
  getDocs(colRef)
    .then((snapshot) => {
      window.names = [];
      snapshot.docs.forEach((doc) => {
        names.push({ ...doc.data(), id: doc.id });
      });
      resolve(names);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

window.login = function (name, pass, teams, names) {
  for (let a = 0; a < teams.length; a++) {
    if (teams[a].teamName == name) {
      if (teams[b].teamPass == pass) {
        return teams[b].teamName;
      } else {
        return "pass";
      }
    }
  }
  for (let b = 0; b < names.length; b++) {
    if (names[b].id == name) {
      if (names[b].password == pass) {
        return names[b].team;
      } else {
        return "pass";
      }
    }
  }
  if (name == "admin" && pass == "adm1n") {
    return true;
  }
  return false;
};

window.adminEditCheck = function (i, a, b, c, d, a2, b2, c2, d2, e) {
  var team = teams[i];
  var player1 = team.player1;
  var player2 = team.player2;
  var player3 = team.player3;
  var player4 = team.player4;

  for (let i = 0; i < names.length; i++) {
    if (names[i].name == player1) {
      var currentName = names[i].id;
      const docRef = doc(db, "names", currentName);
      updateDoc(docRef, {
        status: a,
        name: a2,
        password: e,
      });
    }
    if (names[i].name == player2) {
      var currentName = names[i].id;
      const docRef = doc(db, "names", currentName);
      updateDoc(docRef, {
        status: b,
        name: b2,
        password: e,
      });
    }
    if (names[i].name == player3) {
      var currentName = names[i].id;
      const docRef = doc(db, "names", currentName);
      updateDoc(docRef, {
        status: c,
        name: c2,
        password: e,
      });
    }
    if (d != null) {
      if (names[i].name == player4) {
        var currentName = names[i].id;
        const docRef = doc(db, "names", currentName);
        updateDoc(docRef, {
          status: d,
          name: d2,
          password: e,
        });
      }
    }
  }
};

window.writeNewUsers = function (a, b, c, d, e, f, g, h, i, j) {
  setDoc(doc(db, "names", c), {
    name: c,
    password: b,
    status: g,
    team: a,
  });
  setDoc(doc(db, "names", d), {
    name: d,
    password: b,
    status: h,
    team: a,
  });
  setDoc(doc(db, "names", e), {
    name: e,
    password: b,
    status: i,
    team: a,
  });
  if (f) {
    setDoc(doc(db, "names", f), {
      name: f,
      password: b,
      status: j,
      team: a,
    });
  }
};

window.deleteUsers = function (a, b, c, d) {
  deleteDoc(doc(db, "names", a));
  deleteDoc(doc(db, "names", b));
  deleteDoc(doc(db, "names", c));
  if (d) {
    deleteDoc(doc(db, "names", d));
  }
};
