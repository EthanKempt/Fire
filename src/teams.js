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
  addDoc,
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

window.updateTeams = new Promise((resolve, reject) => {
  getDocs(colRef)
    .then((snapshot) => {
      window.teams = [];
      snapshot.docs.forEach((doc) => {
        teams.push({ ...doc.data(), id: doc.id });
      });
      resolve(teams);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

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

window.messageUpdate = new Promise((resolve, reject) => {
  const colRef2 = collection(
    db,
    "teams",
    sessionStorage.currentTeam,
    "messages"
  );
  getDocs(colRef2)
    .then((snapshot) => {
      window.messages = [];
      snapshot.docs.forEach((doc) => {
        messages.push({ ...doc.data() });
      });
      var sorted = messages.sort((a, b) => a.time.seconds - b.time.seconds);
      resolve(sorted);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

window.addMessage = function (a, b, c) {
  addDoc(collection(db, "teams", a, "messages"), {
    author: b,
    value: c,
    time: new Date(),
  });
};

if (window.location.pathname == "/dist/targets.html") {
  const q = query(
    collection(db, "teams", sessionStorage.currentTeam, "messages")
  );
  onSnapshot(q, (querySnapshot) => {
    // if (!querySnapshot.metadata.hasPendingWrites) {
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push(doc.data());
    });
    var sorted = messages.sort((a, b) => a.time.seconds - b.time.seconds);
    sessionStorage.setItem("messages", JSON.stringify(sorted));
    addMessage();
    //  }
  });
}

const startTime = new Date().getTime() / 1000;

function addMessage() {
  let messageBox = document.getElementById("messager");
  let messages = JSON.parse(sessionStorage.messages);
  let size = messages.length - 1;
  let last = messages[size];
  var color = "secondary";
  if (last.author == "team") {
    color = "primary";
  }
  let message = last.value;
  var scroll = false;
  if (
    messageBox.scrollTop + messageBox.clientHeight ==
    messageBox.scrollHeight
  ) {
    scroll = true;
  }
  if (last.time.seconds >= startTime) {
    messageBox.innerHTML +=
      '<h4><div class="badge bg-' +
      color +
      ' message">' +
      message +
      "</div></h4>";
  }
  document.getElementById("messageVal").value = "";
  if (scroll) {
    scrollBottom();
  }
}

//if (window.location.pathname == "/dist/targets.html") {
window.updateMessages = new Promise((resolve, reject) => {
  var team = sessionStorage.currentTeam;
  const colRef3 = query(collection(db, "teams", team, "messages"));
  getDocs(colRef3)
    .then((snapshot) => {
      window.messages = [];
      snapshot.docs.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      window.allSize = messages.length;
      resolve(messages);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

window.initMessages = async function (a) {
  var team = a.innerHTML;

  window.updateMessagesAd = new Promise((resolve, reject) => {
    const colRef3 = query(collection(db, "teams", team, "messages"));
    getDocs(colRef3)
      .then((snapshot) => {
        window.messages = [];
        snapshot.docs.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        resolve(messages);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  let allMessages = await updateMessagesAd;
  let sorted = allMessages.sort((a, b) => b.time.seconds - a.time.seconds);
  addMessages(allMessages, team);
};

window.saveMessageAdmin = function (team, message, author) {
  addDoc(collection(db, "teams", team, "messages"), {
    author: author,
    value: message,
    time: new Date(),
  });
};

if (window.location.pathname == "/admin/messages.html") {
  initListeners();
  async function initListeners() {
    let teams = await updateTeams;
    for (let a = 0; a < teams.length; a++) {
      const q = query(collection(db, "teams", teams[a].teamName, "messages"));
      onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            insertMessage(change.doc.data(), teams[a].teamName);
          }
        });
      });
    }
  }
}

function insertMessage(message, team) {
  if (message.time.seconds >= startTime) {
    let body = document.getElementById("body" + team);
    var color = "secondary";
    if (message.author == "admin") {
      color = "primary";
    }
    body.innerHTML +=
      '<h4><div class="badge bg-' +
      color +
      ' message">' +
      message.value +
      "</div></h4>";
    scrollBottom(team);
    let a = document.getElementById("messageBox" + team);
    a.value = "";
  }
}
