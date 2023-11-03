import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteField,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
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

const colRef = collection(db, "teams");

getDocs(colRef)
  .then((snapshot) => {
    window.teams = [];
    snapshot.docs.forEach((doc) => {
      teams.push({ ...doc.data() });
    });
    sessionStorage.setItem("teams", JSON.stringify(teams));
  })
  .catch((err) => {
    console.log(err.message);
  });

window.updateTeams = function () {
  getDocs(colRef)
    .then((snapshot) => {
      window.teams = [];
      snapshot.docs.forEach((doc) => {
        teams.push({ ...doc.data() });
      });
      sessionStorage.setItem("teams", JSON.stringify(teams));
    })
    .catch((err) => {
      console.log(err.message);
    });
};

window.adminEdit = function (i, a, b, c, d, e, f) {
  var team = teams[i].teamName;
  const docRef = doc(db, "teams", team);
  updateDoc(docRef, {
    player1: a,
    player2: b,
    player3: c,
    targets: e,
    teamPass: f,
  });
  if (d) {
    if (teams[i].player4) {
      updateDoc(docRef, {
        player4: d,
      });
    } else {
      updateDoc(docRef, {
        player4: d,
      });
    }
  } else {
    if (teams[i].player4) {
      updateDoc(docRef, {
        player4: deleteField(),
      });
    }
  }
};

window.writeNewTeam = function (a, b, c, d, e, f, g, h) {
  const currentRef = doc(db, "teams", a);

  setDoc(doc(db, "teams", a), {
    teamName: a,
    teamPass: b,
    player1: c,
    player2: d,
    player3: e,
    status: h,
  });
  if (f) {
    updateDoc(currentRef, {
      player4: f,
    });
  }
  if (g != null) {
    updateDoc(currentRef, {
      targets: g,
    });
  } else {
    updateDoc(currentRef, {
      targets: "none",
    });
  }
};

window.deleteCurrent = function (a) {
  deleteDoc(doc(db, "teams", a));
};

window.newSave = function (random) {
  let order = random;
  for (let a = 0; a < order.length; a++) {
    let pers = order[a];
    if (a + 1 == order.length) {
      var b = 0;
    } else {
      var b = a + 1;
    }
    let target = order[b];

    const currentRef = doc(db, "teams", pers);
    updateDoc(currentRef, {
      targets: target,
    });
  }
};

const q = query(collection(db, "teams"));
onSnapshot(q, (querySnapshot) => {
  const cities = [];
  querySnapshot.forEach((doc) => {
    cities.push(doc.data().teamName);
  });
  // console.log("Current cities in CA: ", cities.join(", "));
});

window.getMessages = function (a) {
  const colRef2 = collection(db, "teams", a, "messages");
  getDocs(colRef2)
    .then((snapshot) => {
      window.messages = [];
      snapshot.docs.forEach((doc) => {
        messages.push({ ...doc.data() });
      });
      sessionStorage.setItem("messages", JSON.stringify(messages));
    })
    .catch((err) => {
      console.log(err.message);
    });
};
