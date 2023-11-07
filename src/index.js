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

getDocs(colRef)
  .then((snapshot) => {
    window.names = [];
    snapshot.docs.forEach((doc) => {
      names.push({ ...doc.data(), id: doc.id });
      sessionStorage.setItem("names", JSON.stringify(names));
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

window.updateUsers = function () {
  getDocs(colRef)
    .then((snapshot) => {
      window.names = [];
      snapshot.docs.forEach((doc) => {
        names.push({ ...doc.data(), id: doc.id });
        sessionStorage.setItem("names", JSON.stringify(names));
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

window.login = function () {
  userCheck(); //sets userIn and UserInP to current input
  var in2 = userIn.trim();
  var userInput = in2.toLowerCase();
  var in2P = userInP.trim();
  var userInputP = in2P.toLowerCase();
  for (var i = 0; i < names.length; i++) {
    if (i < teams.length) {
      var teamsName = JSON.parse(sessionStorage.teams)[i].teamName;
      var teamsPassword = JSON.parse(sessionStorage.teams)[i].teamPass;
    }
    var userName = JSON.parse(sessionStorage.names)[i].name;
    var userPassword = JSON.parse(sessionStorage.names)[i].password;
    var adminUsername = JSON.parse(sessionStorage.admin)[0].teamName;
    var adminPassword = JSON.parse(sessionStorage.admin)[0].teamPass;
    if (
      (userInput == teamsName && userInputP == teamsPassword) ||
      (userInput == adminUsername && userInputP == adminPassword)
    ) {
      sessionStorage.setItem("currentTeam", teamsName);
      if (userInput == "admin") {
        window.location.href = "/admin/home.html";
      } else {
        window.location.href = "/dist/home.html";
      }
    } else if (userInput == userName && userInputP == userPassword) {
      var userTeam = JSON.parse(sessionStorage.names)[i].team;
      sessionStorage.setItem("currentTeam", userTeam);
      if (userInput == "admin") {
        window.location.href = "/admin/home.html";
      } else {
        window.location.href = "/dist/home.html";
        return true;
      }
    } else if (i + 1 == names.length) {
      alert("incorrect username or password");
    }
  }
};
window.onload = function () {
  var team = sessionStorage.getItem("currentTeam");
  if (team == null && window.location.pathname != "/dist/index.html") {
    window.location.href = "/dist/index.html";
  }
};

window.adminEditCheck = function (i, a, b, c, d, a2, b2, c2, d2) {
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
      });
    }
    if (names[i].name == player2) {
      var currentName = names[i].id;
      const docRef = doc(db, "names", currentName);
      updateDoc(docRef, {
        status: b,
        name: b2,
      });
    }
    if (names[i].name == player3) {
      var currentName = names[i].id;
      const docRef = doc(db, "names", currentName);
      updateDoc(docRef, {
        status: c,
        name: c2,
      });
    }
    if (d != null) {
      if (names[i].name == player4) {
        var currentName = names[i].id;
        const docRef = doc(db, "names", currentName);
        updateDoc(docRef, {
          status: d,
          name: d2,
        });
      }
    }
  }
};

window.writeNewUsers = function (a, b, c, d, e, f, g, h, i, j) {
  setDoc(doc(db, 'names', c), {
    name: c,
    password: b,
    status: g,
    team: a,
  })
  setDoc(doc(db, 'names', d), {
    name: d,
    password: b,
    status: h,
    team: a,
  })
  setDoc(doc(db, 'names', e), {
    name: e,
    password: b,
    status: i,
    team: a,
  })
  if (f) {
    setDoc(doc(db, 'names', f), {
      name: f,
      password: b,
      status: j,
      team: a,
    })
  }
}

window.deleteUsers = function (a, b, c, d) {
  deleteDoc(doc(db, 'names', a))
  deleteDoc(doc(db, 'names', b))
  deleteDoc(doc(db, 'names', c))
  if (d) {
  deleteDoc(doc(db, 'names', d))
  }
}
